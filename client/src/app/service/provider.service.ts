import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../module/interface/provider.interface';
import { KeycloakService } from 'keycloak-angular';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class ProviderService extends BaseService {

  public httpService = 'provider';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    super(http,keycloakService);
  }

  getProvider() {
    return this.get<any>(this.httpService);
  }
  
}
