import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Product } from '../module/interface/product.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{

  public httpService = 'product';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    super(http,keycloakService);
  }

  getAllProduct() {
    return this.get<Product[]>(this.httpService + '/all');
  }

  edit(entity: Product) {
    return this.put<Product>(this.httpService, entity.id || "", entity);
  }

  add(entity: Product): Observable<Product> | null {
    return this.post<Product>(this.httpService, entity);
  }

  delete(id: string){
    return super.delete(this.httpService,id);
  }
}
