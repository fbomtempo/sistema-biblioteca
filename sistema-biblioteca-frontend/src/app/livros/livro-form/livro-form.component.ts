import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { FormService } from 'src/app/shared/services/form-service';

import { Livro } from '../models/livro';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent extends FormService implements OnInit, OnDestroy {

  constructor(
    protected override formBuilder: FormBuilder,
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    const livro: Livro = this.prepararForm();
    this.form = this.formBuilder.group({
      id: [livro.id],
      titulo: [livro.titulo, [Validators.required, Validators.maxLength(75)]],
      autor: [livro.autor, [Validators.required, Validators.maxLength(150)]],
      editora: [livro.editora, [Validators.required, Validators.maxLength(50)]],
      ano: [livro.ano, [Validators.minLength(4), Validators.maxLength(4)]]
    });
    this.escutarMudancasNoForm({ verificarInicializacao: false });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  private prepararForm(): Livro {
    const livro: Livro = this.route.snapshot.data['livro'];
    if (this.route.snapshot.params['id']) {
      this.tipoForm = 'Editar';
    } else {
      this.tipoForm = 'Novo';
    }
    return livro;
  }

  cancelar(): void {
    this.router.navigate(['livros']);
  }

  salvar(): void {
    if (this.form.valid) {
      const livro: Livro = this.form.value;
      console.log(livro)
      if (!this.route.snapshot.params['id']) {
        this.livroService.inserir(livro).subscribe({
          complete: () => {
            this.form.reset();
            this.alterado = false;
            this.poNotification.success('Livro cadastrado com sucesso!')
            this.router.navigate(['livros']);
          }
        });
      } else {
        this.livroService.alterar(livro.id, livro).subscribe({
          complete: () => {
            this.form.reset();
            this.alterado = false;
            this.poNotification.success('Livro alterado com sucesso!')
            this.router.navigate(['livros']);
          }
        });
      }
    }
  }
}
