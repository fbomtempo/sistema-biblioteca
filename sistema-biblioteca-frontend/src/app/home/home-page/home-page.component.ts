import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @ViewChild('optionsForm', { static: true }) form!: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  fechar: PoModalAction = {
    action: () => {
      this.fecharModal();
    },
    label: 'Fechar',
    danger: true
  };
  confirmar: PoModalAction = {
    action: () => {
      this.confirmarLembrete();
    },
    label: 'Confirmar'
  };
  lembrete: any = {
    id: uuidv4()
  };
  lembretes: any[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.recuperarLembretes();
  }

  recuperarLembretes(): void {
    this.lembretes = this.localStorage.recuperar('lembretes');
  }

  abrirModal(): void {
    this.poModal.open();
  }

  private confirmarLembrete(): void {
    if (this.form.valid) {
      this.lembretes.push(this.lembrete);
      this.localStorage.salvar('lembretes', this.lembretes);
      this.lembrete = {
        id: uuidv4()
      };
      this.poModal.close();
    } else {
      const invalido: string = 'Preencha os campos obrigatórios.';
      this.poNotification.warning(invalido);
    }
  }

  fecharModal(): void {
    this.poModal.close();
  }

  removerLembrete(lembrete: any): void {
    this.localStorage.remover('lembretes', lembrete.id);
    this.recuperarLembretes();
  }
}