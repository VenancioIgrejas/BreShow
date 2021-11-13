import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../module/interface/provider.interface';
import { KeycloakService } from 'keycloak-angular';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProviderService extends BaseService {

  public httpService = 'provider';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    super(http,keycloakService);
  }

  getAllProvider() {
    return this.get<Provider[]>(this.httpService + '/all').pipe(map(this.mapEntity));
  }

  edit(entity: Provider) {
    return this.put<Provider>(this.httpService, entity.id || "", entity);
  }

  add(entity: Provider): Observable<Provider> | null {
    return this.post<Provider>(this.httpService, entity);
  }

  delete(id: string){
    return super.delete(this.httpService,id);
  }

  private mapEntity(data: Provider[]){
    return data.map(data => <Provider>{
      ...data, 
      perPriceGrid: ((data.perPrice || 0) /100).toLocaleString('pt-br',{ style: 'percent' })
    })
  }
  
}
