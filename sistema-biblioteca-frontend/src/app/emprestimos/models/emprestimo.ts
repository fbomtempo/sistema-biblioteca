import { Cliente } from "src/app/clientes/models/cliente";
import { Livro } from "src/app/livros/models/livro";

export interface Emprestimo {

  id: number;
  cliente: Cliente;
  livro: Livro;
  dataEmprestimo: string;
  dataDevolucao: string;
  situacaoEmprestimo: string;
}
