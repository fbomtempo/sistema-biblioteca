import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalExclusaoComponent } from './modais/modal-exclusao/modal-exclusao.component';
import { PoModule } from '@po-ui/ng-components';

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
