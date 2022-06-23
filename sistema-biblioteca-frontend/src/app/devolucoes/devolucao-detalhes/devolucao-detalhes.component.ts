import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Devolucao } from '../models/devolucao';

@Component({
  selector: 'app-devolucao-detalhes',
  templateUrl: './devolucao-detalhes.component.html',
  styleUrls: ['./devolucao-detalhes.component.css']
})
export class DevolucaoDetalhesComponent implements OnInit {

  devolucao!: Devolucao;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.devolucao = this.mascara(this.route.snapshot.data['devolucao']);
  }

  private mascara(devolucao: Devolucao): Devolucao {
    devolucao.dataDevolucao = new Date(devolucao.dataDevolucao).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    devolucao.emprestimo.cliente.cpf =  devolucao.emprestimo.cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return devolucao;
  }

  alterar() {
    this.router.navigate([`/devolucoes/editar/${this.devolucao.id}`]);
  }

  voltar(): void {
    this.router.navigate(['/devolucoes']);
  }
}
