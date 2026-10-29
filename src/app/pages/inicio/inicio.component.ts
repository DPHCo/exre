import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StateService } from '../../services/state.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  readonly state = inject(StateService);

  quickLinks = [
    { path: '/catalogo', label: 'Catalogo', icon: 'book-open', tone: 'primary' },
    { path: '/galeria', label: 'Galeria', icon: 'grid-3x3', tone: 'soft' },
    { path: '/favoritos', label: 'Favoritos', icon: 'heart', tone: 'soft' },
    { path: '/progreso', label: 'Progreso', icon: 'trending-up', tone: 'soft' },
  ];
}
