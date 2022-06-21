import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Devolucao } from '../models/devolucao';
import { DevolucaoService } from '../services/devolucao.service';

@Injectable({
  providedIn: 'root'
})
export class DevolucoesResolver implements Resolve<Devolucao> {

  constructor(private devolucaoService: DevolucaoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Devolucao> | Observable<any> {
    if (route.params['id']) {
      const devolucao: Observable<Devolucao> = this.devolucaoService.recuperarPorId(route.params['id']);
      return devolucao;
    }
    return of({});
  }
}
