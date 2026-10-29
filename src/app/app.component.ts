import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { LifecycleService } from './services/lifecycle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly lifecycle = inject(LifecycleService);
  private readonly router = inject(Router);

  readonly showTabBar = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => !e.urlAfterRedirects.includes('/detalle'))
    ),
    { initialValue: true }
  );

  ngOnInit(): void {
    void this.lifecycle.start();
  }

  ngOnDestroy(): void {
    void this.lifecycle.stop();
  }
}
