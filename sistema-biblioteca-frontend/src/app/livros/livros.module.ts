import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivrosRoutingModule } from './livros-routing.module';
import { LivroListaComponent } from './livro-lista/livro-lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';
import { LivroFormComponent } from './livro-form/livro-form.component';
import { LivroDetalhesComponent } from './livro-detalhes/livro-detalhes.component';

@NgModule({
  declarations: [
    LivroListaComponent,
    LivroFormComponent,
    LivroDetalhesComponent
  ],
  imports: [
    CommonModule,
    LivrosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PoModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class LivrosModule { }
