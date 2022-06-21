import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { LivrosResolver } from './guards/livros.resolver';
import { LivroDetalhesComponent } from './livro-detalhes/livro-detalhes.component';
import { LivroFormComponent } from './livro-form/livro-form.component';
import { LivroListaComponent } from './livro-lista/livro-lista.component';

const routes: Routes = [
  {
    path: '',
    component: LivroListaComponent
  },
  {
    path: 'novo',
    component: LivroFormComponent,
    canDeactivate: [ CanDeactivateGuard ],
    resolve: { livro: LivrosResolver }
  },
  {
    path: 'editar/:id',
    component: LivroFormComponent,
    canDeactivate: [ CanDeactivateGuard ],
    resolve: { livro: LivrosResolver }
  },
  {
    path: 'visualizar/:id',
    component: LivroDetalhesComponent,
    resolve: { livro: LivrosResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivrosRoutingModule { }
