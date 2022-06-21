import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisponibilidadeLivro } from '../models/enums/disponibilidade-livro';
import { Livro } from '../models/livro';

@Component({
  selector: 'app-livro-detalhes',
  templateUrl: './livro-detalhes.component.html',
  styleUrls: ['./livro-detalhes.component.css']
})
export class LivroDetalhesComponent implements OnInit {

  livro!: Livro;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.livro = this.prepararObj(this.route.snapshot.data['livro']);
  }

  private prepararObj(livro: Livro): Livro {
    (livro.disponibilidadeLivro === DisponibilidadeLivro.DISPONIVEL)
      ? livro.disponibilidadeLivro = 'DISPONÍVEL'
      : livro.disponibilidadeLivro = 'INDISPONÍVEL';
    return livro;
  }

  aplicarEstilo(): any {
    return {
      'po-text-color-11': (this.livro.disponibilidadeLivro === 'DISPONÍVEL'),
      'po-text-color-07': (this.livro.disponibilidadeLivro === 'INDISPONÍVEL')
    };
  }

  alterar() {
    this.router.navigate([`/livros/editar/${this.livro.id}`]);
  }

  voltar(): void {
    this.router.navigate(['/livros']);
  }
}
