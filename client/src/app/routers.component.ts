import { Routes } from '@angular/router';
import { CategoryPageComponent } from './core/category/category-page/category-page.component';
import { HomePageComponent } from './core/home/home-page/home-page.component';
import { ProductPageComponent } from './core/product/product-page/product-page.component';
import { ProviderPageComponent } from './core/provider/provider-page/provider-page.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
    { path: 'produto', component: ProductPageComponent , canActivate: [AuthGuard]},
    { path: 'categoria', component: CategoryPageComponent , canActivate: [AuthGuard]},
    { path: 'fornecedor', component: ProviderPageComponent , canActivate: [AuthGuard]},
  ];