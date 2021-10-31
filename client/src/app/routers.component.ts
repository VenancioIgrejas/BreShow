import { Routes } from '@angular/router';
import { HomePageComponent } from './core/home/home-page/home-page.component';
import { ProviderPageComponent } from './core/provider/provider-page/provider-page.component';
import { TestePageComponent } from './core/teste/teste-page/teste-page.component';
import { AuthGuardKeycloak } from './guard/auth-keycloak.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomePageComponent},
    { path: 'teste', component: TestePageComponent , canActivate: [AuthGuardKeycloak]},
    { path: 'produto', component: TestePageComponent , canActivate: [AuthGuardKeycloak]},
    { path: 'categoria', component: TestePageComponent , canActivate: [AuthGuardKeycloak]},
    { path: 'fornecedor', component: ProviderPageComponent , canActivate: [AuthGuardKeycloak]},
  ];