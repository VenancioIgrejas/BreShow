import { Component, OnInit } from '@angular/core';
import { Router } from 'src/app/module/interface/router.interface';
import { routes } from 'src/app/routers.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  public routers = [] as Router[];
  constructor() { }

  ngOnInit(): void {

    this.routers = routes.filter(x => x.path != '').map(x => <Router>{
      Id: `/${x.path}`,
      Description: (x.path || '')[0] + (x.path || '').substring(1)
    })
  }

}
