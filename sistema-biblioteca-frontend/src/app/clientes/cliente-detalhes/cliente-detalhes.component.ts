import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.css']
})
export class ClienteDetalhesComponent implements OnInit {

  cliente!: Cliente;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente = this.mascara(this.route.snapshot.data['cliente']);
  }

  private mascara(cliente: Cliente): Cliente {
    cliente.cpf = cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    (cliente.telefone.length > 10)
      ? cliente.telefone = cliente.telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")
      : cliente.telefone = cliente.telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    return cliente;
  }

  alterar(): void {
    this.router.navigate([`/clientes/editar/${this.cliente.id}`]);
  }

  voltar(): void {
    this.router.navigate(['/clientes']);
  }
}
