import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud-service';
import { environment } from 'src/environments/environment';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService extends CrudService<Emprestimo> {

 constructor(protected override http: HttpClient) {
    super(http, `${environment.API_URL}/api/emprestimos`);
  }
}
