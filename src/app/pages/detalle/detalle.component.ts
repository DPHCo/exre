import { UpperCasePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { LEVEL_LABELS, ResourceLevel, ResourceType } from '../../models/resource';
import { StateService } from '../../services/state.service';
import { IconComponent } from '../../shared/icon.component';
import { typeIcon } from '../../shared/icons';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [IconComponent, UpperCasePipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss',
})
export class DetalleComponent {
  readonly state = inject(StateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))), {
    initialValue: null as string | null,
  });

  private readonly from = toSignal(this.route.queryParamMap.pipe(map((q) => q.get('from'))), {
    initialValue: 'catalogo' as string | null,
  });

  readonly resource = computed(() => {
    const id = this.id();
    return id ? this.state.getResourceById(id) : undefined;
  });

  typeIcon = typeIcon;

  levelLabel(level: ResourceLevel): string {
    return LEVEL_LABELS[level];
  }

  typeLabel(type: ResourceType): string {
    const labels: Record<ResourceType, string> = {
      video: 'Video',
      lectura: 'Lectura',
      practica: 'Practica',
      documento: 'Documento',
    };
    return labels[type];
  }

  linkLabel(url: string): string {
    return url.replace(/^https?:\/\//, '');
  }

  goBack(): void {
    const from = this.from() ?? 'catalogo';
    const map: Record<string, string> = {
      catalogo: '/catalogo',
      galeria: '/galeria',
      favoritos: '/favoritos',
      inicio: '/inicio',
      progreso: '/progreso',
    };
    void this.router.navigateByUrl(map[from] ?? '/catalogo');
  }

  toggleFavorite(): void {
    const r = this.resource();
    if (r) this.state.toggleFavorite(r.id);
  }

  toggleCompleted(): void {
    const r = this.resource();
    if (r) this.state.toggleCompleted(r.id);
  }

  async share(): Promise<void> {
    const r = this.resource();
    if (!r) return;
    const payload = { title: r.title, text: r.description, url: r.contentUrl };
    try {
      if (navigator.share) {
        await navigator.share(payload);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${r.title}\n${r.contentUrl}`);
      }
    } catch {}
  }
}
