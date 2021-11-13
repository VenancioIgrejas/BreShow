import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api';
import { Router } from 'src/app/module/interface/router.interface';
import { routes } from 'src/app/routers.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  public routers = [] as Router[];
  public items = [] as MenuItem[];
  public itemsPopup = [] as MenuItem[];
  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {

    // this.items.push(<MenuItem>{
    //   label:`<ng-template pTemplate="start">
    //             <img src="assets/logo.svg" height="40" class="p-mr-2">
    //         </ng-template>`,
    //   escape:false
    // })

    let tmp = routes.filter(x => x.path != '').map(x => <MenuItem>
      {label: (x.path || '')[0].toLocaleUpperCase() + (x.path || '').substring(1), routerLink: [`/${x.path}`]}
    );

    tmp.forEach(x => this.items.push(x));

      this.keycloakService.loadUserProfile().then(x => {
        this.itemsPopup = [{
          label: `${x.firstName}`,
          items: [{
              label: 'Logout',
              icon: 'pi pi-user-minus',
              command: () => {
                  this.keycloakService.logout();
              }
          }]
        }]

      })

    
    };
}
