import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../module/interface/category.interface';
import { KeycloakService } from 'keycloak-angular';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  public httpService = 'category';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    super(http,keycloakService);
  }

  getAllCategory() {
    return this.get<Category[]>(this.httpService + '/all');
  }

  edit(entity: Category) {
    return this.put<Category>(this.httpService, entity.id || "", entity);
  }

  add(entity: Category): Observable<Category> | null {
    return this.post<Category>(this.httpService, entity);
  }

  delete(id: string){
    return super.delete(this.httpService,id);
  }


}
