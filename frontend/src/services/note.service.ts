import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  header: HttpHeaders;
  baseUrl: string;

  constructor(
    private httpClient: HttpClient) { 
      this.baseUrl = environment.API_BASE + environment.API_NOTE;
    }

  getHeader(token) {
    return new HttpHeaders({
      "Authorization": "Bearer " + token
    })
  }

  getNotes(token, adminLg) {
    const url = this.baseUrl + "?" + environment.API_LG + "=" + adminLg;
    return this.httpClient.get(url, {headers: this.getHeader(token)})
  }

  addNote(note, token, adminLg) {
    return this.httpClient.post(this.baseUrl, {
      lifegroup: adminLg,
      text: note
    }, {headers: this.getHeader(token)});
  }

  deleteNote(id, token) {
    const url = this.baseUrl + "?" + environment.ID + "=" + id;
    return this.httpClient.delete(url, {headers: this.getHeader(token)});
  }

}
