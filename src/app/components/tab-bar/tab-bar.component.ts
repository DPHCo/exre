import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent {
  tabs = [
    { path: '/inicio', label: 'Inicio', icon: 'house' },
    { path: '/catalogo', label: 'Catalogo', icon: 'book-open' },
    { path: '/galeria', label: 'Galeria', icon: 'grid-3x3' },
    { path: '/favoritos', label: 'Favoritos', icon: 'heart' },
    { path: '/progreso', label: 'Progreso', icon: 'trending-up' },
  ];
}
