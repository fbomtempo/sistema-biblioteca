import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { PoModule } from '@po-ui/ng-components';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteDetalhesComponent } from './cliente-detalhes/cliente-detalhes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ClienteListaComponent,
    ClienteFormComponent,
    ClienteDetalhesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PoModule
  ],
  providers: []
})
export class ClientesModule { }
