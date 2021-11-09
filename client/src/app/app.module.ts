import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';

//Service
import {ProviderService} from './service/provider.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { TesteModule } from './core/teste/teste.module';
import { HomeModule } from './core/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProviderModule } from './core/provider/provider.module';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu'
import {ButtonModule} from 'primeng/button';
import { BaseService } from './service/base.service';
import { CategoryModule } from './core/category/category.module';
import { CategoryService } from './service/category.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    TesteModule,
    HomeModule,
    ProviderModule,
    CategoryModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MenubarModule,
    MenuModule,
    ButtonModule
  ],
  providers: [
    {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
    },
    BaseService,
    ProviderService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
