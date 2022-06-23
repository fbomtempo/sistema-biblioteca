import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { SharedModule } from '../shared/shared.module';
import { EmprestimoDetalhesComponent } from './emprestimo-detalhes/emprestimo-detalhes.component';
import { EmprestimoFormComponent } from './emprestimo-form/emprestimo-form.component';
import { EmprestimoListaComponent } from './emprestimo-lista/emprestimo-lista.component';
import { EmprestimosRoutingModule } from './emprestimos-routing.module';

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
