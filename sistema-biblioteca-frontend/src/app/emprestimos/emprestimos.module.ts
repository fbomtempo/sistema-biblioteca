import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmprestimosRoutingModule } from './emprestimos-routing.module';
import { EmprestimoListaComponent } from './emprestimo-lista/emprestimo-lista.component';
import { PoModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmprestimoFormComponent } from './emprestimo-form/emprestimo-form.component';
import { EmprestimoDetalhesComponent } from './emprestimo-detalhes/emprestimo-detalhes.component';


@NgModule({
  declarations: [
    EmprestimoListaComponent,
    EmprestimoFormComponent,
    EmprestimoDetalhesComponent
  ],
  imports: [
    CommonModule,
    EmprestimosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PoModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class EmprestimosModule { }
