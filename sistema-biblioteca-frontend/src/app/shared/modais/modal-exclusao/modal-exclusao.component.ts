import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'modal-exclusao',
  templateUrl: './modal-exclusao.component.html',
  styleUrls: ['./modal-exclusao.component.css']
})
export class ModalExclusaoComponent implements OnInit {

  titulo: string = '';
  mensagem: string = '';
  obj: any = {};
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  acaoPrimaria: PoModalAction = {
    action: () => {
      this.evento.emit(
        {
          obj: this.obj,
          resposta: true
        });
    },
    label: 'Sim'
  };
  acaoSecundaria: PoModalAction = {
    action: () => {
      this.evento.emit(
        {
          resposta: false
        });
    },
    label: 'Cancelar',
    danger: true
  };
  @Output() evento: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
