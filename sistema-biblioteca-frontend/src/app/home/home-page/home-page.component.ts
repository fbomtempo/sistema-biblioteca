import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  PoCalendarMode,
  PoChartOptions,
  PoChartSerie,
  PoChartType,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
} from '@po-ui/ng-components';
import { map } from 'rxjs';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  paginaCarregada: boolean = false;
  erro: boolean = false;

  totalEmprestimosMensal: Array<PoChartSerie> = []
  readonly colunas: Array<string> = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  readonly opcoesColunas: PoChartOptions = {
    axis: {
      minRange: 0,
      maxRange: 20,
      gridLines: 5
    }
  };

  modo: any = (window.innerWidth >= 790 && window.innerWidth <= 1366)
                ? PoCalendarMode.Range
                : undefined;

  @ViewChild('optionsForm', { static: true }) form!: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  readonly fechar: PoModalAction = {
    action: () => {
      this.fecharModal();
    },
    label: 'Fechar',
    danger: true
  };
  readonly confirmar: PoModalAction = {
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
    private dropdownService: DropdownService,
    private localStorage: LocalStorageService,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.recuperarEmprestimos();
    this.recuperarLembretes();
  }

  recuperarEmprestimos() {
    this.dropdownService.recuperarEmprestimos()
      .pipe(
        map(emprestimos => {
          let totalEmprestimosMensal: number[] = new Array(12).fill(0);
          emprestimos.forEach(emprestimo => {
            let mes: number = new Date(emprestimo.dataEmprestimo).getMonth();
            totalEmprestimosMensal[mes]++;
          });
          return totalEmprestimosMensal;
        })
      )
      .subscribe({
        next: (totalEmprestimosMensal) => {
          this.totalEmprestimosMensal = [
            { label: 'Empréstimos', data: totalEmprestimosMensal, type: PoChartType.Column, color: 'color-06' }
          ]
        },
        error: () => this.erro = true,
        complete: () => this.paginaCarregada = true
      })
  };

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
