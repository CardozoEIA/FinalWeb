import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path:'users',
        loadChildren: ()=>
          import('./pages/users/user.routes').then((m) => m.UserRoutes)
      },
      {
        path:'pedidos',
        loadChildren: ()=>
          import('./pages/pedido/pedido.routes').then((m) => m.PedidoRoutes)
      }
      ,
      {
        path:'template',
        loadChildren: ()=>
          import('./pages/template/template.routes').then((m) => m.templateRoutes)
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
