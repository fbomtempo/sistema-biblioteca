import { Component } from '@angular/core';
import { PoMenuItem, PoNavbarItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  combo: string = '';
  readonly navbarLogo: string = '../assets/images/logo.png';
  readonly navbarItems: Array<PoNavbarItem> = [
    { label: 'Home', link:'/home' }
  ];
  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Página Inicial',
      link:'/home',
      icon: 'po-icon-home',
      shortLabel: 'Home'
    },
    {
      label: 'Módulo de Clientes',
      link:'/clientes',
      icon: 'po-icon-user',
      shortLabel: 'Clientes',
      subItems: [
        { label: 'Lista de Clientes', link: '/clientes' },
        { label: 'Cadastrar Cliente', link: '/clientes/novo' }
      ]
    },
    {
      label: 'Módulo de Livros',
      link:'/livros',
      icon: 'po-icon-book',
      shortLabel: 'Livros',
      subItems: [
        { label: 'Lista de Livros', link: '/livros' },
        { label: 'Cadastrar Livro', link: '/livros/novo' }
      ]
    },
    {
      label: 'Módulo de Empréstimos',
      link:'/emprestimos',
      icon: 'po-icon-upload',
      shortLabel: 'Empréstimos',
      subItems: [
        { label: 'Lista de Empréstimos', link: '/emprestimos' },
        { label: 'Cadastrar Empréstimos', link: '/emprestimos/novo' }
      ]
    },
    {
      label: 'Módulo de Devoluções',
      link:'/devolucoes',
      icon: 'po-icon-calendar-ok',
      shortLabel: 'Devoluções',
      subItems: [
        { label: 'Lista de Devoluções', link: '/devolucoes' },
        { label: 'Cadastrar Devoluções', link: '/devolucoes/novo' }
      ]
    }
  ];

  private onClick(): void {
    alert('Clicked in menu item')
  }

}
