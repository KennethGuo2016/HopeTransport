import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LifegroupService {
  header: HttpHeaders;
  baseUrl: string;
  constructor(
    private httpClient: HttpClient) {
    this.baseUrl = environment.API_BASE + environment.API_LG;
   }
  
  getHeader(token) {
    return new HttpHeaders({
      "Authorization": "Bearer " + token
    })
  }

  createLifegroup(body) {
    return this.httpClient.post(this.baseUrl, body);
  }

  getLifeGroup() {
    return this.httpClient.get(this.baseUrl);
  }

  deleteLifegroup(name, token) {
    const url = this.baseUrl + "?" + environment.NAME + "=" + name;
    return this.httpClient.delete(url, { headers: this.getHeader(token) });
  }
  
}
