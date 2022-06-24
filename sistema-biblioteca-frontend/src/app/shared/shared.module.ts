import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';

import { ModalExclusaoComponent } from './modais/modal-exclusao/modal-exclusao.component';
import { ErroServerComponent } from './erro-server/erro-server.component';

@NgModule({
  declarations: [
    ModalExclusaoComponent,
    ErroServerComponent
  ],
  imports: [
    CommonModule,
    PoModule
  ],
  exports: [
    ModalExclusaoComponent,
    ErroServerComponent
  ]
})
export class SharedModule { }
