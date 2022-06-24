import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Emprestimo } from '../models/emprestimo';
import { SituacaoEmprestimo } from '../models/enums/situacao-emprestimo';

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
    emprestimo.dataEmprestimo = new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    emprestimo.dataDevolucao = new Date(emprestimo.dataDevolucao).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    emprestimo.cliente.cpf = emprestimo.cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return emprestimo;
  }

  aplicarEstilo(): any {
    return {
      'po-text-color-08': (this.emprestimo.situacaoEmprestimo === SituacaoEmprestimo.PENDENTE),
      'po-text-color-11': (this.emprestimo.situacaoEmprestimo === SituacaoEmprestimo.FINALIZADO)
    };
  }

  alterar(): void {
    this.router.navigate([`/emprestimos/editar/${this.emprestimo.id}`]);
  }

  voltar(): void {
    this.router.navigate(['/emprestimos']);
  }
}
