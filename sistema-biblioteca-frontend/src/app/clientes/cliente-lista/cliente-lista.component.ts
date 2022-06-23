import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoTableAction, PoTableColumn, PoTableLiterals } from '@po-ui/ng-components';
import { catchError, Observable, of, Subject } from 'rxjs';
import { ModalExclusaoComponent } from 'src/app/shared/modais/modal-exclusao/modal-exclusao.component';

import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  filtro: string = '';
  readonly columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'Código',
      type: 'number',
      width: '5%'
    },
    {
      property: 'nome',
      label: 'Nome'
    },
    {
      property: 'cpf',
      label: 'CPF'
    },
    {
      property: 'email',
      label: 'E-Mail'
    },
    {
      property: 'telefone',
      label: 'Telefone'
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
    noData: 'Nenhum dado encontrado',
  }
  clientes$: Observable<Cliente[]> = new Observable();
  error: Subject<boolean> = new Subject();
  @ViewChild(ModalExclusaoComponent, { static: true }) modalExclusao!: ModalExclusaoComponent;

  constructor(
    private clienteService: ClienteService,
    private poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atualizarLista();
  }

  private atualizarLista(): void {
    this.clientes$ = this.clienteService.recuperarTodos()
      .pipe(
        catchError(() => {
          this.error.next(true);
          return of();
        })
      );
  }

  mostrarDados(clientes: Cliente[]): Cliente[] {
    clientes.map(cliente => {
      cliente.cpf = cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      (cliente.telefone.length > 10)
        ? cliente.telefone = cliente.telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")
        : cliente.telefone = cliente.telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      return cliente;
    });
    if (this.filtro === '') {
      return clientes;
    }
    return clientes.filter(cliente => {
      return cliente.nome.replace(/\s/g, '').toLowerCase().includes(this.filtro.replace(/\s/g, '').toLowerCase());
    });
  }

  cadastrar(): void {
    this.router.navigate(['clientes/novo']);
  }

  editar(item: any): void {
    this.router.navigate([`clientes/editar/${item.id}`]);
  }

  private abrirModalExclusao(cliente: Cliente): void {
    this.modalExclusao.titulo = 'Cliente';
    this.modalExclusao.mensagem = `Tem certeza que deseja mesmo remover o cliente de nome '${cliente.nome}'?`;
    this.modalExclusao.obj = cliente;
    this.modalExclusao.poModal.open();
  }

  deletar(res: any): void {
    if (res.resposta == true) {
      this.clienteService.remover(res.obj.id)
        .subscribe({
          complete: () => {
            this.modalExclusao.poModal.close();
            this.poNotification.success('Cliente removido com sucesso!')
            this.atualizarLista();
          }
        });
    }
    this.modalExclusao.poModal.close();
  }

  visualizar(item: any): void {
    this.router.navigate([`clientes/visualizar/${item.id}`]);
  }
}
