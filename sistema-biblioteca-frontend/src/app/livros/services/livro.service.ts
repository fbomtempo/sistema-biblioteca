import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud-service';
import { environment } from 'src/environments/environment';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService extends CrudService<Livro> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API_URL}/api/livros`);
  }
}
