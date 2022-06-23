import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Livro } from '../models/livro';
import { LivroService } from '../services/livro.service';

@Injectable({
  providedIn: 'root'
})
export class LivrosResolver implements Resolve<Livro> {

  constructor(
    private livroService: LivroService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Livro> | Observable<any> {
    if (route.params['id']) {
      const livro: Observable<Livro> = this.livroService.recuperarPorId(route.params['id']);
      return livro;
    }
    return of({});
  }
}
