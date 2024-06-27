import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private http: HttpClient) {}

  getAdministrations(): Observable<any> {
    return this.http.get(`${BASEURL}/administrations`);
  }

  addAdministration(body): Observable<any> {
    return this.http.post(`${BASEURL}/administration/add-administration`, body);
  }

  deleteAdministration(id): Observable<any> {
    return this.http.delete(
      `${BASEURL}/administration/delete-administration/${id}`
    );
  }

  editAdministration(id, body): Observable<any> {
    return this.http.put(
      `${BASEURL}/administration/add-administration/${id}`,
      body
    );
  }
}
