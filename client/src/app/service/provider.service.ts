import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../module/interface/provider.interface';


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  public baseHttp = '';

  constructor(private http: HttpClient) { }

  getProvider() {
    return this.http.get<Provider[]>( this.baseHttp + '/get');
  }
  
}
