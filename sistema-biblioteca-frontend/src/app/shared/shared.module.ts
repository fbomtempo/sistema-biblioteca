import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';

import { ModalExclusaoComponent } from './modais/modal-exclusao/modal-exclusao.component';

@NgModule({
  declarations: [
    ModalExclusaoComponent
  ],
  imports: [
    CommonModule,
    PoModule
  ],
  exports: [
    ModalExclusaoComponent
  ]
})
export class SharedModule { }
