import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CATEGORY_COLORS } from '../../data/recursos';
import { StateService } from '../../services/state.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-progreso',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './progreso.component.html',
  styleUrl: './progreso.component.scss',
})
export class ProgresoComponent {
  readonly state = inject(StateService);
  private readonly router = inject(Router);

  categoryColor(category: string): string {
    return (CATEGORY_COLORS as Record<string, { base: string }>)[category]?.base ?? '#4F46E5';
  }

  openDetail(id: string): void {
    this.state.openResource(id);
    void this.router.navigate(['/detalle', id], { queryParams: { from: 'progreso' } });
  }
}
