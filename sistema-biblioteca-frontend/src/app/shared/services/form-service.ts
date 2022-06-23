import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription, take, takeUntil } from 'rxjs';

import { ICanDeactivate } from '../guards/ican-deactivate';

interface EscutarFormOpcoes {

  verificarInicializacao: boolean;
}

export class FormService implements ICanDeactivate {

  form: FormGroup = new FormGroup({});
  tipoForm: string = '';
  alterado: boolean = false;
  verificarDirty: Subject<boolean> = new Subject();
  inscricao: Subscription = new Subscription();

  constructor(protected formBuilder: FormBuilder) { }

  escutarMudancasNoForm(opcoes: EscutarFormOpcoes): void {
    if (!opcoes.verificarInicializacao) {
      this.inscricaoMudancas();
    } else {
      this.marcarFormPristine();
      this.form.valueChanges
        .pipe(
          takeUntil(this.verificarDirty)
        )
        .subscribe(() => {
          if (!this.form.pristine) {
            this.verificarDirty.next(true);
          }
        });
    }
  }

  private marcarFormPristine(): void {
    this.verificarDirty.asObservable()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.alterado = false;
            this.form.markAsPristine();
          }
        },
        complete: () => setTimeout(() => this.inscricaoMudancas())
      });
  }

  private inscricaoMudancas(): void {
    this.inscricao = this.form.valueChanges
      .subscribe(() => {
        this.alterado = true;
      });
  }

  desativarRota(): boolean {
    return (this.alterado)
      ? confirm('Tem certeza que deseja sair? As alterações serão perdidas.')
      : true;
  }
}
