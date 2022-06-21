import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { ICanDeactivate } from "../guards/ican-deactivate";

export class FormService implements ICanDeactivate {

  form: FormGroup = new FormGroup({});
  tipoForm: string = '';
  alterado: boolean = false;
  inscricao: Subscription = new Subscription();
  alteracoes: Subject<boolean> = new Subject();
  alt: boolean = false;

  constructor(protected formBuilder: FormBuilder) { }

  escutarMudancasNoForm(): void {
    this.inscricao = this.form.valueChanges.subscribe((algo) => {
      this.alterado = true;
    });
  }

  desativarRota(): boolean {
    if (this.alterado) {
      return confirm('Tem certeza que deseja sair? As alterações serão perdidas.');
    }
    return true;
  }
}
