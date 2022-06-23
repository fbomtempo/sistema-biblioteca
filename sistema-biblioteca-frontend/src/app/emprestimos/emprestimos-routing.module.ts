import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { EmprestimoDetalhesComponent } from './emprestimo-detalhes/emprestimo-detalhes.component';
import { EmprestimoFormComponent } from './emprestimo-form/emprestimo-form.component';
import { EmprestimoListaComponent } from './emprestimo-lista/emprestimo-lista.component';
import { EmprestimosResolver } from './guards/emprestimos.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmprestimoListaComponent
  },
  {
    path: 'novo',
    component: EmprestimoFormComponent,
    canDeactivate: [ CanDeactivateGuard ],
    resolve: { emprestimo: EmprestimosResolver }
  },
  {
    path: 'editar/:id',
    component: EmprestimoFormComponent,
    canDeactivate: [ CanDeactivateGuard ],
    resolve: { emprestimo: EmprestimosResolver }
  },
  {
    path: 'visualizar/:id',
    component: EmprestimoDetalhesComponent,
    resolve: { emprestimo: EmprestimosResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprestimosRoutingModule { }
