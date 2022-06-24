import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erro-server',
  templateUrl: './erro-server.component.html',
  styleUrls: ['./erro-server.component.css']
})
export class ErroServerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  atualizar(): void {
    location.reload();
  }

}
