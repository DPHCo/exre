import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceGridCardComponent } from '../../components/resource-grid-card/resource-grid-card.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [ResourceGridCardComponent],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss',
})
export class GaleriaComponent {
  readonly state = inject(StateService);
  private readonly router = inject(Router);

  openDetail(id: string): void {
    this.state.openResource(id);
    void this.router.navigate(['/detalle', id], { queryParams: { from: 'galeria' } });
  }
}
