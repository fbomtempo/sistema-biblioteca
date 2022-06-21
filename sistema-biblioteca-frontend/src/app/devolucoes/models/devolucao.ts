import { Emprestimo } from "src/app/emprestimos/models/emprestimo";

export interface Devolucao {

  id: number;
  emprestimo: Emprestimo;
  dataDevolucao: string;
}
