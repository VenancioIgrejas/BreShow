import { Component, OnInit } from '@angular/core';
import { Router } from 'src/app/module/interface/router.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  public routers = [] as Router[];
  constructor() { }

  ngOnInit(): void {
    this.routers = [
      {Id: '/home', Description: 'Home'},
      {Id: '/teste', Description: 'Teste'}
    ]
  }

}
