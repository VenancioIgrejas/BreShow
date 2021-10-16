import { Component, OnInit } from '@angular/core';
import { Router } from 'src/app/module/interface/router.interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  public routers = [] as Router[];
  constructor() { }

  ngOnInit(): void {
    this.routers = [
      {Id: '/home', Description: 'Home'},
      {Id: '/teste', Description: 'Teste'}
    ]
  }

}
