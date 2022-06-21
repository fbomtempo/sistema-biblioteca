import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { ClienteDetalhesComponent } from './cliente-detalhes/cliente-detalhes.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClientesResolver } from './guards/clientes.resolver';

const routes: Routes = [
  {
    path: '',
    component: ClienteListaComponent
  },
  {
    path: 'novo',
    component: ClienteFormComponent,
    canDeactivate: [ CanDeactivateGuard ],
    resolve: { cliente: ClientesResolver }
  },
  {
    path: 'editar/:id',
    component: ClienteFormComponent,
    canDeactivate: [ CanDeactivateGuard ],
    resolve: { cliente: ClientesResolver }
  },
  {
    path: 'visualizar/:id',
    component: ClienteDetalhesComponent,
    resolve: { cliente: ClientesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
