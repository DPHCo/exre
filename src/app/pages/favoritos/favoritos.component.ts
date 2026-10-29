import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceListCardComponent } from '../../components/resource-list-card/resource-list-card.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [ResourceListCardComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss',
})
export class FavoritosComponent {
  readonly state = inject(StateService);
  private readonly router = inject(Router);

  openDetail(id: string): void {
    this.state.openResource(id);
    void this.router.navigate(['/detalle', id], { queryParams: { from: 'favoritos' } });
  }

  toggleFavorite(id: string): void {
    this.state.toggleFavorite(id);
  }
}
