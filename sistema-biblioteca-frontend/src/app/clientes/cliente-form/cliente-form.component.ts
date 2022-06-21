import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { FormService } from 'src/app/shared/services/form-service';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente-service.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent extends FormService implements OnInit, OnDestroy {

  tipoTelefone: string = '';

  constructor(
    protected override formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    const cliente: Cliente = this.prepararForm();
    this.form = this.formBuilder.group({
      id: [cliente.id],
      nome: [cliente.nome, [Validators.required, Validators.maxLength(150)]],
      email: [cliente.email, [Validators.maxLength(75)]],
      cpf: [cliente.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      tipoTelefone: [this.tipoTelefone, [Validators.required]],
      telefone: [cliente.telefone, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    });
    this.escutarMudancasNoForm();
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  private prepararForm(): Cliente {
    const cliente: Cliente = this.route.snapshot.data['cliente'];
    if (this.route.snapshot.params['id']) {
      this.tipoForm = 'Editar';
      this.tipoTelefone = (cliente.telefone.length > 10)
        ? 'celular'
        : 'residencial';
    } else {
      this.tipoForm = 'Novo';
    }
    return cliente;
  }

  cancelar(): void {
    this.router.navigate(['clientes']);
  }

  salvar(): void {
    if (this.form.valid) {
      this.form.removeControl('tipoTelefone');
      const cliente: Cliente = this.form.value;
      if (!this.route.snapshot.params['id']) {
        this.clienteService.inserir(cliente).subscribe({
          complete: () => {
            this.form.reset();
            this.alterado = false;
            this.poNotification.success('Cliente cadastrado com sucesso!')
            this.router.navigate(['clientes']);
          }
        });
      } else {
        this.clienteService.alterar(cliente.id, cliente).subscribe({
          complete: () => {
            this.form.reset();
            this.alterado = false;
            this.poNotification.success('Cliente alterado com sucesso!')
            this.router.navigate(['clientes']);
          }
        });
      }
    }
  }

  trocarTipoTelefone(event: any) {
    this.tipoTelefone = event;
    this.form.patchValue({
      telefone: null
    })
  }
}
