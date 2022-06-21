/*escutarMudancasNoForm(): void {
  this.inscricao = this.form.valueChanges.subscribe(() => {
    let contador: number = 0;
    if (this.tipoForm === 'Novo') {
      for (const campo in this.form.value) {
        if (this.form.get(campo)?.value != null && this.form.get(campo)?.value != '') {
          contador++;
        }
      }
      this.alterado = (contador > 0)
        ? true
        : false;
    }
  });
}

override escutarMudancasNoForm(): void {
    this.inscricao = this.form.valueChanges.subscribe(() => {
      let contador: number = 0;
      if (this.tipoForm === 'Novo') {
        for (const campo in this.form.value) {
          if (this.form.get(campo)?.value != null && this.form.get(campo)?.value != '') {
            contador++;
          }
        }
        this.alterado = (contador > 0)
          ? true
          : false;
      }
    });
  }

----------------------------
form-service.ts =
----------------------------

/*let contador: number = 0;
  for (const campo in this.form.value) {
    if (this.form.get(campo)?.value != null ||  this.form.get(campo)?.value != '') {
      contador++;
    }
  }
  return (contador > 0)
    ? confirm('Tem certeza que deseja sair? As alterações serão perdidas.')
    : true;*/



