import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceListCardComponent } from '../../components/resource-list-card/resource-list-card.component';
import { CATEGORIES } from '../../data/recursos';
import { StateService } from '../../services/state.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule, ResourceListCardComponent, IconComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss',
})
export class CatalogoComponent {
  readonly state = inject(StateService);
  private readonly router = inject(Router);

  categories = ['Todas', ...CATEGORIES];

  onSearch(value: string): void {
    this.state.setSearch(value);
  }

  selectCategory(cat: string): void {
    this.state.setCategory(cat);
  }

  openDetail(id: string): void {
    this.state.openResource(id);
    void this.router.navigate(['/detalle', id], { queryParams: { from: 'catalogo' } });
  }

  toggleFavorite(id: string): void {
    this.state.toggleFavorite(id);
  }
}
