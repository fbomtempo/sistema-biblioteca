import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoComboLiterals, PoComboOption, PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { SituacaoEmprestimo } from 'src/app/emprestimos/models/enums/situacao-emprestimo';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';

import { Devolucao } from '../models/devolucao';
import { DevolucaoService } from '../services/devolucao.service';

@Component({
  selector: 'app-devolucao-form',
  templateUrl: './devolucao-form.component.html',
  styleUrls: ['./devolucao-form.component.css']
})
export class DevolucaoFormComponent extends FormService implements OnInit, OnDestroy {

  opcoesInputEmprestimo: PoComboOption[] = [];
  readonly literals: PoComboLiterals = {
    noData: 'Nenhum dado encontrado'
  }

  constructor(
    protected override formBuilder: FormBuilder,
    private devolucaoService: DevolucaoService,
    private dropdownService: DropdownService,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    const devolucao: Devolucao = this.prepararForm();
    this.recuperarDados(devolucao);
    this.form = this.formBuilder.group({
      id: [devolucao.id],
      emprestimo: [null, [Validators.required]],
      dataDevolucao: [devolucao.dataDevolucao, [Validators.required]]
    });
    this.escutarMudancasNoForm({ verificarInicializacao: true })
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  private prepararForm(): Devolucao {
    const devolucao: Devolucao = this.route.snapshot.data['devolucao'];
    if (this.route.snapshot.params['id']) {
      this.tipoForm = 'Editar';
    } else {
      this.tipoForm = 'Nova';
      devolucao.dataDevolucao = this.converterData(new Date());
    }
    return devolucao;
  }

  private converterData(data: Date): string {
    const offset = data.getTimezoneOffset();
    data = new Date(data.getTime() - (offset * 60 * 1000));
    return data.toISOString().split('T')[0];
  }

  private recuperarDados(devolucao: Devolucao): void {
    this.dropdownService.recuperarEmprestimos()
      .pipe(
        map(emprestimos => {
          return emprestimos
            .filter(emprestimo => emprestimo.situacaoEmprestimo != SituacaoEmprestimo.FINALIZADO || emprestimo.id === devolucao.emprestimo?.id)
            .map(emprestimo => {
              return {
                label:
                  emprestimo.cliente.nome + ' | ' + emprestimo.livro.titulo,
                value: emprestimo.id,
              };
            });
        })
      )
      .subscribe(opcoes => {
        this.opcoesInputEmprestimo = opcoes;
        setTimeout(() => this.form.patchValue({
          emprestimo: (this.route.snapshot.queryParams['devolver']) ? this.route.snapshot.queryParams['devolver'] : devolucao.emprestimo?.id
        }, { emitEvent: false }));
      });
  }

  cancelar(): void {
    this.router.navigate(['devolucoes']);
  }

  salvar(): void {
    if (this.form.valid) {
      const devolucao: Devolucao = this.criarObjeto(['emprestimo']);
      if (!this.route.snapshot.params['id']) {
        this.devolucaoService.inserir(devolucao).subscribe({
          complete: () => {
            this.form.reset();
            this.alterado = false;
            this.poNotification.success('Devolução cadastrada com sucesso!');
            this.router.navigate(['devolucoes']);
          }
        });
      } else {
        this.devolucaoService.alterar(devolucao.id, devolucao).subscribe({
          complete: () => {
            this.form.reset();
            this.alterado = false;
            this.poNotification.success('Devolução alterada com sucesso!');
            this.router.navigate(['devolucoes']);
          }
        });
      }
    }
  }
}
