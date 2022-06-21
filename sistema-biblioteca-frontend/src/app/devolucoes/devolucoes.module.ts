import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevolucoesRoutingModule } from './devolucoes-routing.module';
import { DevolucaoListaComponent } from './devolucao-lista/devolucao-lista.component';
import { DevolucaoFormComponent } from './devolucao-form/devolucao-form.component';
import { DevolucaoDetalhesComponent } from './devolucao-detalhes/devolucao-detalhes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PoModule } from '@po-ui/ng-components';


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
