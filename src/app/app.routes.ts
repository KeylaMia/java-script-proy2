import { Routes } from '@angular/router';
// Importa tus componentes aquí (o usa Lazy Loading como te muestro abajo)
import { Home } from './pages/home/home';
import { Contacto } from './pages/contacto/contacto';
import { Dashboard  } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { MiCuenta } from './pages/mi-cuenta/mi-cuenta';
import { NotFound } from './pages/not-found/not-found';
import { Ofertas } from './pages/ofertas/ofertas';
import { Productos } from './pages/productos/productos';
import { Tienda } from './pages/tienda/tienda';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { path: 'home', component: Home },
  { path: 'contacto', component: Contacto },
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'mi-cuenta', component: MiCuenta },
  { path: 'ofertas', component: Ofertas },
  { path: 'productos', component: Productos },
  { path: 'tienda', component: Tienda },
  { path: '404', component: NotFound },
  { 
    path: '**', 
    redirectTo: '404', 
    pathMatch: 'full' 
  }
];
