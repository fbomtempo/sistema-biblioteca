import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cliente } from 'src/app/clientes/models/cliente';
import { Emprestimo } from 'src/app/emprestimos/models/emprestimo';
import { SituacaoEmprestimo } from 'src/app/emprestimos/models/enums/situacao-emprestimo';
import { DisponibilidadeLivro } from 'src/app/livros/models/enums/disponibilidade-livro';
import { Livro } from 'src/app/livros/models/livro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  readonly API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  recuperarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.API_URL}/api/clientes`)
      .pipe(
        map(
          clientes => clientes.sort((a, b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))
        )
      );
  }

  recuperarLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.API_URL}/api/livros`)
      .pipe(
        map(
          livros => {
            livros = livros.filter(livro => livro.disponibilidadeLivro != DisponibilidadeLivro.INDISPONIVEL);
            return livros.sort((a, b) => (a.titulo > b.titulo) ? 1 : ((b.titulo > a.titulo) ? -1 : 0));
          }
        )
      );
  }

  recuperarEmprestimos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.API_URL}/api/emprestimos`)
      .pipe(
        map(
          emprestimos => emprestimos.filter(emprestimo => emprestimo.situacaoEmprestimo != SituacaoEmprestimo.FINALIZADO)
        )
      );
  }
}
