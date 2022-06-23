import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Emprestimo } from '../models/emprestimo';
import { EmprestimoService } from '../services/emprestimo.service';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosResolver implements Resolve<Emprestimo> {

  constructor(
    private emprestimoService: EmprestimoService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Emprestimo> | Observable<any> {
    if (route.params['id']) {
      const emprestimo: Observable<Emprestimo> = this.emprestimoService.recuperarPorId(route.params['id']);
      return emprestimo;
    }
    return of({});
  }
}
