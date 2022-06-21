import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { DevolucaoDetalhesComponent } from './devolucao-detalhes/devolucao-detalhes.component';
import { DevolucaoFormComponent } from './devolucao-form/devolucao-form.component';
import { DevolucaoListaComponent } from './devolucao-lista/devolucao-lista.component';
import { DevolucoesResolver } from './guards/devolucoes.resolver';

const routes: Routes = [
  {
    path: '',
    component: DevolucaoListaComponent
  },
  {
    path: 'novo',
    component: DevolucaoFormComponent,
    canDeactivate: [ CanDeactivateGuard ],
    resolve: { devolucao: DevolucoesResolver }
  },
  {
    path: 'editar/:id',
    component: DevolucaoFormComponent,
    canDeactivate: [ CanDeactivateGuard ],
    resolve: { devolucao: DevolucoesResolver }
  },
  {
    path: 'visualizar/:id',
    component: DevolucaoDetalhesComponent,
    resolve: { devolucao: DevolucoesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevolucoesRoutingModule { }
