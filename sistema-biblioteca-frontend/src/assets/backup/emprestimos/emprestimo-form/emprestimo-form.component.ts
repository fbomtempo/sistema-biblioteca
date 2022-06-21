/*import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoComboOption, PoNotificationService } from '@po-ui/ng-components';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ClienteService } from 'src/app/clientes/services/cliente-service.service';
import { LivroService } from 'src/app/livros/services/livro.service';
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

  constructor(
    protected override formBuilder: FormBuilder,
    private emprestimoService: EmprestimoService,
    private clienteService: ClienteService,
    private livroService: LivroService,
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
    this.escutarMudancasNoForm();
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  private recuperarDados(emprestimo: Emprestimo): void {
    this.clienteService.recuperarTodos().subscribe(clientes => {
      clientes.forEach(cliente => {
        let obj: any = {
          label: cliente.nome,
          value: JSON.stringify(cliente)
        };
        this.opcoesInputCliente.push(obj);
        if (this.tipoForm === 'Editar') {
          this.form.patchValue({
            cliente: JSON.stringify(emprestimo.cliente)
          });
        }
      });
      this.carregandoInputCliente = false;
    });
    this.livroService.recuperarTodos().subscribe(livros => {
      livros.forEach(livro => {
        let obj: any = {
          label: livro.titulo,
          value: JSON.stringify(livro)
        };
        this.opcoesInputLivro.push(obj);
        if (this.tipoForm === 'Editar') {
          this.form.patchValue({
            livro: JSON.stringify(emprestimo.livro)
          });
        }
      });
      this.carregandoInputLivro = false;
    });
  }

  private prepararForm(): Emprestimo {
    const emprestimo: Emprestimo = this.route.snapshot.data['emprestimo'];
    if (this.route.snapshot.params['id']) {
      this.tipoForm = 'Editar';
    } else {
      this.tipoForm = 'Novo';
      emprestimo.dataEmprestimo = this.converterData();
    }
    return emprestimo;
  }

  private converterData(): string {
    let date: Date = new Date();
    const offset = new Date().getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    return date.toISOString().split('T')[0];
  }

  override escutarMudancasNoForm(): void {
    this.inscricao = this.form.valueChanges.subscribe(() => {
      let contador: number = 0;
      if (this.tipoForm === 'Novo') {
        for (const campo in this.form.value) {
          if (campo != 'dataEmprestimo' && this.form.get(campo)?.value != null && this.form.get(campo)?.value != '') {
            contador++;
          }
        }
        this.alterado = (contador > 0)
          ? true
          : false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['emprestimos']);
  }

  salvar(): void {
    if (this.form.valid) {
      this.form.removeControl('tipoTelefone');
      let emprestimo: Emprestimo = this.form.value;
      emprestimo.cliente = JSON.parse(this.form.get('cliente')?.value);
      emprestimo.livro = JSON.parse(this.form.get('livro')?.value);
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

  opcaoTemplate(opcao: any): string {
    let valorOpcao: any = JSON.parse(opcao.value);
    return `${valorOpcao.nome} - CPF ${valorOpcao.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}`;
  }
}*/
