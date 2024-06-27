import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root',
})
export class TypeDocumentService {
  constructor(private http: HttpClient) {}

  getTypeDocuments(): Observable<any> {
    return this.http.get(`${BASEURL}/typeDocuments`);
  }

  addTypeDocument(body): Observable<any> {
    return this.http.post(`${BASEURL}/typeDocument/add-typeDocument`, body);
  }

  deleteTypeDocument(id): Observable<any> {
    return this.http.delete(
      `${BASEURL}/typeDocument/delete-typeDocument/${id}`
    );
  }

  editTypeDocument(id, body): Observable<any> {
    return this.http.put(
      `${BASEURL}/typeDocument/add-typeDocument/${id}`,
      body
    );
  }
}
