import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud-service';
import { environment } from 'src/environments/environment';
import { Devolucao } from '../models/devolucao';

@Injectable({
  providedIn: 'root'
})
export class DevolucaoService extends CrudService<Devolucao> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API_URL}/api/devolucoes`);
  }
}
