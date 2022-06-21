import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  salvar(chave: string, collecaoObj: any[]): void {
    const collecaoObjStr: string = JSON.stringify(collecaoObj);
    localStorage.setItem(chave, collecaoObjStr);
  }

  recuperar(chave: string): any[] {
    const collecaoObjStr: string | null  = localStorage.getItem(chave);
    if (collecaoObjStr != null) {
      return JSON.parse(collecaoObjStr);
    }
    return [];
  }

  remover(chave: string, id: string): void {
    let collecaoObj: any[] = this.recuperar(chave);
    collecaoObj.splice(collecaoObj.findIndex(obj => obj.id === id), 1);
    localStorage.removeItem(chave);
    this.salvar(chave, collecaoObj);
  }

  limpar(): void {
    localStorage.clear();
  }
}
