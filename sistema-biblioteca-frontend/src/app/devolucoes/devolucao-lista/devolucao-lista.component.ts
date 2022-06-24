import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoTableAction, PoTableColumn, PoTableLiterals } from '@po-ui/ng-components';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { ModalExclusaoComponent } from 'src/app/shared/modais/modal-exclusao/modal-exclusao.component';

import { Devolucao } from '../models/devolucao';
import { DevolucaoService } from '../services/devolucao.service';

@Component({
  selector: 'app-devolucao-lista',
  templateUrl: './devolucao-lista.component.html',
  styleUrls: ['./devolucao-lista.component.css']
})
export class DevolucaoListaComponent implements OnInit {

  filtro: string = '';
  readonly columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'Código',
      type: 'number',
      width: '5%'
    },
    {
      property: 'emprestimo.cliente.nome',
      label: 'Cliente'
    },
    {
      property: 'emprestimo.cliente.cpf',
      label: 'CPF'
    },
    {
      property: 'emprestimo.livro.titulo',
      label: 'Livro'
    },
    {
      property: 'dataDevolucao',
      label: 'Data de Devolução'
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
    }
  ];
  readonly literals: PoTableLiterals = {
    columnsManager: 'Gerenciador de colunas',
    noData: 'Nenhum dado encontrado'
  };
  devolucoes$: Observable<Devolucao[]> = new Observable();
  error: Subject<boolean> = new Subject();
  @ViewChild(ModalExclusaoComponent, { static: true }) modalExclusao!: ModalExclusaoComponent;

  constructor(
    private devolucaoService: DevolucaoService,
    private poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atualizarLista();
  }

  private atualizarLista(): void {
    this.devolucoes$ = this.devolucaoService.recuperarTodos()
      .pipe(
        map(devolucoes => {
          return devolucoes.map(devolucao => {
            devolucao.emprestimo.cliente.cpf = devolucao.emprestimo.cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            devolucao.dataDevolucao = new Date(devolucao.dataDevolucao).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            return devolucao;
          });
        }),
        catchError(() => {
          this.error.next(true);
          return of();
        })
      );
  }

  mostrarDados(devolucoes: Devolucao[]): Devolucao[] {
    if (this.filtro === '') {
      return devolucoes;
    }
    return devolucoes.filter(devolucao => {
      return devolucao.emprestimo.cliente.nome.replace(/\s/g, '').toLowerCase().includes(this.filtro.replace(/\s/g, '').toLowerCase());
    });
  }

  cadastrar(): void {
    this.router.navigate(['devolucoes/novo']);
  }

  editar(item: any): void {
    this.router.navigate([`devolucoes/editar/${item.id}`]);
  }

  private abrirModalExclusao(devolucao: Devolucao): void {
    this.modalExclusao.titulo = 'Devolução';
    this.modalExclusao.mensagem = `Tem certeza que deseja mesmo remover a devolução de empréstimo referente ao cliente '${devolucao.emprestimo.cliente.nome}', CPF ${devolucao.emprestimo.cliente.cpf} ?`;
    this.modalExclusao.obj = devolucao;
    this.modalExclusao.poModal.open();
  }

  deletar(res: any): void {
    if (res.resposta == true) {
      this.devolucaoService.remover(res.obj.id)
        .subscribe({
          complete: () => {
            this.modalExclusao.poModal.close();
            this.poNotification.success('Devolução removida com sucesso!');
            this.atualizarLista();
          }
        });
    } else {
      this.modalExclusao.poModal.close();
    }
  }

  visualizar(item: any): void {
    this.router.navigate([`devolucoes/visualizar/${item.id}`]);
  }
}
