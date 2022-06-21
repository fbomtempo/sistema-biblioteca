import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesResolver implements Resolve<Cliente> {

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> | Observable<any> {
    if (route.params['id']) {
      const cliente: Observable<Cliente> = this.clienteService.recuperarPorId(route.params['id']);
      return cliente;
    }
    return of({});
  }
}
