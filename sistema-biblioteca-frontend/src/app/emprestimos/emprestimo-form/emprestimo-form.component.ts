import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoComboOption, PoNotificationService, PoTableLiterals } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { DisponibilidadeLivro } from 'src/app/livros/models/enums/disponibilidade-livro';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';

import { Emprestimo } from '../models/emprestimo';
import { EmprestimoService } from '../services/emprestimo.service';

@Component({
  selector: 'app-emprestimo-form',
  templateUrl: './emprestimo-form.component.html',
  styleUrls: ['./emprestimo-form.component.css']
})
export class EmprestimoFormComponent extends FormService implements OnInit, OnDestroy {

  opcoesInputCliente: PoComboOption[] = [];
  opcoesInputLivro: PoComboOption[] = [];
  carregandoInputCliente: boolean = true;
  carregandoInputLivro: boolean = true;
  readonly literals: PoTableLiterals = {
    noData: 'Nenhum dado encontrado',
  }

  constructor(
    protected override formBuilder: FormBuilder,
    private emprestimoService: EmprestimoService,
    private dropdownService: DropdownService,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    const emprestimo: Emprestimo = this.prepararForm();
    this.recuperarDados(emprestimo);
    this.form = this.formBuilder.group({
      id: [emprestimo.id],
      cliente: [null, [Validators.required]],
      livro: [null, [Validators.required]],
      dataEmprestimo: [emprestimo.dataEmprestimo, [Validators.required]],
      dataDevolucao: [emprestimo.dataDevolucao, [Validators.required]]
    });
    this.escutarMudancasNoForm({ verificarInicializacao: true });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  private prepararForm(): Emprestimo {
    const emprestimo: Emprestimo = this.route.snapshot.data['emprestimo'];
    if (this.route.snapshot.params['id']) {
      this.tipoForm = 'Editar';
    } else {
      this.tipoForm = 'Novo';
      emprestimo.dataEmprestimo = this.converterData(new Date());
    }
    return emprestimo;
  }

  private converterData(data: Date): string {
    const offset = data.getTimezoneOffset();
    data = new Date(data.getTime() - (offset * 60 * 1000));
    return data.toISOString().split('T')[0];
  }

  private recuperarDados(emprestimo: Emprestimo): void {
    this.dropdownService.recuperarClientes()
      .pipe(
        map(clientes => {
          return clientes.map(cliente => {
            return {
              label: cliente.nome,
              value: cliente.id
            };
          });
        })
      )
      .subscribe(opcoes => {
        this.opcoesInputCliente = opcoes;
        this.carregandoInputCliente = false;
        setTimeout(() => this.form.patchValue({
          cliente: emprestimo.cliente?.id
        }, { emitEvent: false }));
      });
    this.dropdownService.recuperarLivros()
      .pipe(
        map(livros => {
          return livros
            .filter(livro => livro.disponibilidadeLivro != DisponibilidadeLivro.INDISPONIVEL || livro.id === emprestimo.livro?.id)
            .map(livro => {
              return {
                label: livro.titulo,
                value: livro.id
              };
            });
        })
      )
      .subscribe(opcoes => {
        this.opcoesInputLivro = opcoes;
        this.carregandoInputLivro = false;
        setTimeout(() => this.form.patchValue({
          livro: emprestimo.livro?.id
        }, { emitEvent: false }));
      });
  }

  cancelar(): void {
    this.router.navigate(['emprestimos']);
  }

  salvar(): void {
    if (this.form.valid) {
      const emprestimo: Emprestimo = this.criarObjeto();
      if (!this.route.snapshot.params['id']) {
        this.emprestimoService.inserir(emprestimo).subscribe({
          complete: () => {
            this.form.reset();
            this.alterado = false;
            this.poNotification.success('Empréstimo cadastrado com sucesso!')
            this.router.navigate(['emprestimos']);
          }
        });
      } else {
        this.emprestimoService.alterar(emprestimo.id, emprestimo).subscribe({
          complete: () => {
            this.form.reset();
            this.alterado = false;
            this.poNotification.success('Empréstimo alterado com sucesso!')
            this.router.navigate(['emprestimos']);
          }
        });
      }
    }
  }

  private criarObjeto() {
    this.form.get('cliente')?.patchValue({
      id: this.form.get('cliente')?.value
    });
    this.form.get('livro')?.patchValue({
      id: this.form.get('livro')?.value
    });
    return this.form.value;
  }
}
