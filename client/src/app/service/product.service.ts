import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.get<Product[]>(this.httpService + '/all').pipe(map(this.mapEntity));
  }

  edit(entity: Product) {
    return this.put<Product>(this.httpService, entity.id || "", entity);
  }

  add(entity: Product): Observable<Product> | null {
    console.log(entity);
    const entityMod = {...entity,
                      categoryId: entity.category?.id,
                      providerId: entity.provider?.id}

    return this.post<any>(this.httpService, entityMod);
  }

  delete(id: string){
    return super.delete(this.httpService,id);
  }

  mapEntity(data: Product[]){
    return data.map(prod => <Product>{...prod,
      priceGrid: (Number.parseFloat(prod.price as any) || 0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL',minimumFractionDigits: 2}),
      priceTotalGrid: (Number.parseFloat(prod.priceTotal as any) || 0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL',minimumFractionDigits: 2}),
      priceFinalGrid: (Number.parseFloat(prod.priceFinal as any) || 0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL',minimumFractionDigits: 2}),
      dateIn: new Date(prod.dateIn || ""),
      dateInGrid: new Date(prod.dateIn || "").toLocaleDateString()
    });
  }

  public maskPriceToReal(price: number | string): string{
    if(typeof price == "string"){
      price = Number.parseFloat(price as any);
    }
    return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL',minimumFractionDigits: 2});
  }
}
