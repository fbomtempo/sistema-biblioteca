import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { SharedModule } from '../shared/shared.module';
import { ClienteDetalhesComponent } from './cliente-detalhes/cliente-detalhes.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClientesRoutingModule } from './clientes-routing.module';

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
