import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoTableAction, PoTableColumn, PoTableLiterals } from '@po-ui/ng-components';
import { catchError, Observable, of, Subject } from 'rxjs';
import { ModalExclusaoComponent } from 'src/app/shared/modais/modal-exclusao/modal-exclusao.component';

import { Livro } from '../models/livro';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

  filtro: string = '';
  readonly columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'Código',
      type: 'number',
      width: '5%'
    },
    {
      property: 'titulo',
      label: 'Título'
    },
    {
      property: 'autor',
      label: 'Autor'
    },
    {
      property: 'editora',
      label: 'Editora'
    },
    {
      property: 'ano',
      label: 'Ano'
    },
    {
      property: 'disponibilidadeLivro',
      label: 'Disponibilidade',
      type: 'label',
      labels: [
        { value: 'DISPONIVEL', color: 'color-11', label: 'Disponível' },
        { value: 'INDISPONIVEL', color: 'color-07', label: 'Indisponível' }
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
    }
  ];
  readonly literals: PoTableLiterals = {
    columnsManager: 'Gerenciador de colunas',
    noData: 'Nenhum dado encontrado',
  }
  livros$: Observable<Livro[]> = new Observable();
  error: Subject<boolean> = new Subject();
  @ViewChild(ModalExclusaoComponent, { static: true }) modalExclusao!: ModalExclusaoComponent;

  constructor(
    private livroService: LivroService,
    private poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atualizarLista();
  }

  private atualizarLista(): void {
    this.livros$ = this.livroService.recuperarTodos()
      .pipe(
        catchError(() => {
          this.error.next(true);
          return of();
        })
      );
  }

  mostrarDados(livros: Livro[]): Livro[] {
    if (this.filtro === '') {
      return livros;
    }
    return livros.filter(livro => {
      return livro.titulo.replace(/\s/g, '').toLowerCase().includes(this.filtro.replace(/\s/g, '').toLowerCase());
    });
  }

  cadastrar(): void {
    this.router.navigate(['livros/novo']);
  }

  editar(item: any): void {
    this.router.navigate([`livros/editar/${item.id}`]);
  }

  private abrirModalExclusao(livro: Livro): void {
    this.modalExclusao.titulo = 'Livro';
    this.modalExclusao.mensagem = `Tem certeza que deseja mesmo remover o livro de título '${livro.titulo}'?`;
    this.modalExclusao.obj = livro;
    this.modalExclusao.poModal.open();
  }

  deletar(res: any): void {
    if (res.resposta == true) {
      this.livroService.remover(res.obj.id)
        .subscribe({
          complete: () => {
            this.modalExclusao.poModal.close();
            this.poNotification.success('Livro removido com sucesso!');
            this.atualizarLista();
          }
        });
    } else {
      this.modalExclusao.poModal.close();
    }
  }

  visualizar(item: any): void {
    this.router.navigate([`livros/visualizar/${item.id}`]);
  }
}
