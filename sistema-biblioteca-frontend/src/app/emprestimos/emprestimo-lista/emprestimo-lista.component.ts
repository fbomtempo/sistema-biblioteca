import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoTableAction, PoTableColumn, PoTableLiterals } from '@po-ui/ng-components';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { ModalExclusaoComponent } from 'src/app/shared/modais/modal-exclusao/modal-exclusao.component';

import { Emprestimo } from '../models/emprestimo';
import { SituacaoEmprestimo } from '../models/enums/situacao-emprestimo';
import { EmprestimoService } from '../services/emprestimo.service';

@Component({
  selector: 'app-emprestimo-lista',
  templateUrl: './emprestimo-lista.component.html',
  styleUrls: ['./emprestimo-lista.component.css']
})
export class EmprestimoListaComponent implements OnInit {

  filtro: string = '';
  readonly columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'Código',
      type: 'number',
      width: '5%'
    },
    {
      property: 'cliente.nome',
      label: 'Cliente'
    },
    {
      property: 'livro.titulo',
      label: 'Livro'
    },
    {
      property: 'dataEmprestimo',
      label: 'Data de Empréstimo'
    },
    {
      property: 'dataDevolucao',
      label: 'Data de Devolução'
    },
    {
      property: 'situacaoEmprestimo',
      label: 'Situação',
      type: 'label',
      labels: [
        { value: SituacaoEmprestimo.PENDENTE, color: 'color-08', label: 'Realizado' },
        { value: SituacaoEmprestimo.FINALIZADO, color: 'color-11', label: 'Finalizado' }
      ]
    }
  ];
  readonly actions: PoTableAction[] = [
    {
      icon: 'po-icon-edit',
      label: 'Editar',
      action: this.editar.bind(this)
    },
    {
      icon: 'po-icon-delete',
      label: 'Remover',
      action: this.abrirModalExclusao.bind(this)
    },
    {
      icon: 'po-icon-info',
      label: 'Visualizar',
      action: this.visualizar.bind(this)
    },
    {
      icon: 'po-icon-calendar-ok',
      label: 'Devolver',
      action: this.devolver.bind(this)
    }
  ];
  readonly literals: PoTableLiterals = {
    columnsManager: 'Gerenciador de colunas',
    noData: 'Nenhum dado encontrado'
  }
  emprestimos$: Observable<Emprestimo[]> = new Observable();
  error: Subject<boolean> = new Subject();
  @ViewChild(ModalExclusaoComponent, { static: true }) modalExclusao!: ModalExclusaoComponent;

  constructor(
    private emprestimoService: EmprestimoService,
    private poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atualizarLista();
  }

  private atualizarLista(): void {
    this.emprestimos$ = this.emprestimoService.recuperarTodos()
      .pipe(
        map(emprestimos => {
          return emprestimos.map(emprestimo => {
            emprestimo.dataEmprestimo = new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            emprestimo.dataDevolucao = new Date(emprestimo.dataDevolucao).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            return emprestimo;
          });
        }),
        catchError(() => {
          this.error.next(true);
          return of();
        })
      );
  }

  mostrarDados(emprestimos: Emprestimo[]): Emprestimo[] {
    if (this.filtro === '') {
      return emprestimos;
    }
    return emprestimos.filter(emprestimo => {
      return emprestimo.cliente.nome.replace(/\s/g, '').toLowerCase().includes(this.filtro.replace(/\s/g, '').toLowerCase());
    });
  }

  cadastrar(): void {
    this.router.navigate(['emprestimos/novo']);
  }

  editar(item: any): void {
    this.router.navigate([`emprestimos/editar/${item.id}`]);
  }

  private abrirModalExclusao(emprestimo: Emprestimo): void {
    this.modalExclusao.titulo = 'Empréstimo';
    this.modalExclusao.mensagem = `Tem certeza que deseja mesmo remover o empréstimo referente ao cliente '${emprestimo.cliente.nome}', CPF ${emprestimo.cliente.cpf} ?`;
    this.modalExclusao.obj = emprestimo;
    this.modalExclusao.poModal.open();
  }

  deletar(res: any): void {
    if (res.resposta == true) {
      this.emprestimoService.remover(res.obj.id)
        .subscribe({
          complete: () => {
            this.modalExclusao.poModal.close();
            this.poNotification.success('Empréstimo removido com sucesso!')
            this.atualizarLista();
          }
        });
    }
    this.modalExclusao.poModal.close();
  }

  visualizar(item: any): void {
    this.router.navigate([`emprestimos/visualizar/${item.id}`]);
  }

  devolver(item: any) {
    if (item.situacaoEmprestimo != SituacaoEmprestimo.FINALIZADO) {
      this.router.navigate(['devolucoes/novo'], { queryParams: { devolver: item.id }});
    } else {
      this.poNotification.warning('Empréstimo já finalizado!')
    }
  }
}

