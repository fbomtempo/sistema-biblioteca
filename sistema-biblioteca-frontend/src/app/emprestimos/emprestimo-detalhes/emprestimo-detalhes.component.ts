import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emprestimo } from '../models/emprestimo';

@Component({
  selector: 'app-emprestimo-detalhes',
  templateUrl: './emprestimo-detalhes.component.html',
  styleUrls: ['./emprestimo-detalhes.component.css']
})
export class EmprestimoDetalhesComponent implements OnInit {

  emprestimo!: Emprestimo;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.emprestimo = this.mascara(this.route.snapshot.data['emprestimo']);
  }

  private mascara(emprestimo: Emprestimo): Emprestimo {
    emprestimo.cliente.cpf = emprestimo.cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return emprestimo;
  }

  aplicarEstilo(): any {
    return {
      'po-text-color-08': (this.emprestimo.situacaoEmprestimo === 'REALIZADO'),
      'po-text-color-11': (this.emprestimo.situacaoEmprestimo === 'FINALIZADO')
    };
  }

  alterar() {
    this.router.navigate([`/emprestimos/editar/${this.emprestimo.id}`]);
  }

  voltar(): void {
    this.router.navigate(['/emprestimos']);
  }
}
