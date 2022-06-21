import { HttpClient } from "@angular/common/http";
import { delay, Observable, take } from "rxjs";

export class CrudService<T extends { id?: number }> {

  constructor(
    protected http: HttpClient,
    protected readonly API_URL: string
  ) { }

  recuperarTodos(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(750)
      );
  }

  recuperarPorId(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`)
      .pipe(
        take(1)
      )
  }

  inserir(obj: T): Observable<T> {
    return this.http.post<T>(this.API_URL, obj)
      .pipe(
        take(1)
      );
  }

  alterar(id: number, obj: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${id}`, obj)
      .pipe(
        take(1)
      )
  }

  remover(id: number): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${id}`)
      .pipe(
        take(1)
      )
  }
}
