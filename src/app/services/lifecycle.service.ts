import { Injectable, OnDestroy, inject } from '@angular/core';
import { App, AppState } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class LifecycleService implements OnDestroy {
  private readonly state = inject(StateService);
  private handles: PluginListenerHandle[] = [];
  private started = false;

  async start(): Promise<void> {
    if (this.started) return;
    this.started = true;

    this.state.pushLifecycleEvent('start', true);

    const stateHandle = await App.addListener('appStateChange', (state: AppState) => {
      this.state.pushLifecycleEvent('appStateChange', state.isActive);
    });

    const pauseHandle = await App.addListener('pause', () => {
      this.state.pushLifecycleEvent('pause', false);
    });

    const resumeHandle = await App.addListener('resume', () => {
      this.state.pushLifecycleEvent('resume', true);
    });

    this.handles = [stateHandle, pauseHandle, resumeHandle];
  }

  async ngOnDestroy(): Promise<void> {
    await this.stop();
  }

  async stop(): Promise<void> {
    for (const handle of this.handles) {
      await handle.remove();
    }
    this.handles = [];
    this.started = false;
  }
}
