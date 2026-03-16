import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'orders-mfe',
        exposedModule: './Routes',
      }).then((m) => m.ORDERS_ROUTES),
  },
  {
    path: 'pcs',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'pcs-mfe',
        exposedModule: './Routes',
      }).then((m) => m.PCS_ROUTES),
  },
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
];
