import { Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProgresoComponent } from './pages/progreso/progreso.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: InicioComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'progreso', component: ProgresoComponent },
  { path: '**', redirectTo: 'inicio' },
];
