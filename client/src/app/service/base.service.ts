import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Header } from 'primeng/api';
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

  getById<T>(urlService: string, id: string){
    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.get<T>(this.baseHttp + urlService,{ 
        headers: header, 
        params: new HttpParams().set('id', id) 
      }))
    );
  }

  post<T>(urlService: string, entity: T){
    if(this.keycloakbaseService.isTokenExpired()) return null;

    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.post(this.baseHttp + urlService + '/add', entity, { headers: header }))
    )
  }

  put<T>(urlService: string ,entity: T){
    if(this.keycloakbaseService.isTokenExpired()) return null;

    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.put(this.baseHttp + urlService + '/edit', entity, { headers: header }))
    )
  }

  delete(url: string){
    if(this.keycloakbaseService.isTokenExpired()) return null;

    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.put(this.baseHttp + url, { headers: header }))
    )
  }

}
