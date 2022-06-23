import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { SharedModule } from '../shared/shared.module';
import { DevolucaoDetalhesComponent } from './devolucao-detalhes/devolucao-detalhes.component';
import { DevolucaoFormComponent } from './devolucao-form/devolucao-form.component';
import { DevolucaoListaComponent } from './devolucao-lista/devolucao-lista.component';
import { DevolucoesRoutingModule } from './devolucoes-routing.module';

@NgModule({
  declarations: [
    DevolucaoListaComponent,
    DevolucaoFormComponent,
    DevolucaoDetalhesComponent
  ],
  imports: [
    CommonModule,
    DevolucoesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PoModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class DevolucoesModule { }
