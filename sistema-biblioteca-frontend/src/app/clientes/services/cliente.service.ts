import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud-service';
import { environment } from 'src/environments/environment';

import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<Cliente> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API_URL}/api/clientes`);
  }
}
