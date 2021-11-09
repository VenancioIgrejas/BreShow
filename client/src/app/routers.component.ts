import { Routes } from '@angular/router';
import { CategoryPageComponent } from './core/category/category-page/category-page.component';
import { HomePageComponent } from './core/home/home-page/home-page.component';
import { ProviderPageComponent } from './core/provider/provider-page/provider-page.component';
import { TestePageComponent } from './core/teste/teste-page/teste-page.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomePageComponent},
    { path: 'teste', component: TestePageComponent , canActivate: [AuthGuard]},
    { path: 'produto', component: TestePageComponent , canActivate: [AuthGuard]},
    { path: 'categoria', component: CategoryPageComponent , canActivate: [AuthGuard]},
    { path: 'fornecedor', component: ProviderPageComponent , canActivate: [AuthGuard]},
  ];