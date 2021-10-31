import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public baseHttp = environment.urlService;

  constructor(private httpBase: HttpClient, private keycloakbaseService: KeycloakService) { }

  getHeaderWithToken() {
    return this.keycloakbaseService.addTokenToHeader();
  }

  get<T>(urlService: string){
    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.get<T>(this.baseHttp + urlService,{ headers: header }))
    );
  }
}
