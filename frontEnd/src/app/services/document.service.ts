import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  getDocuments(): Observable<any> {
    return this.http.get(`${BASEURL}/documents`);
  }
  getDocumentsByUser(id): Observable<any> {
    return this.http.get(`${BASEURL}/documents/${id}`);
  }

  addDocument(body): Observable<any> {
    return this.http.post(`${BASEURL}/document/add-document`, body);
  }

  deleteDocument(id): Observable<any> {
    return this.http.delete(
      `${BASEURL}/document/delete-document/${id}`
    );
  }

  editDocument(id, body): Observable<any> {
    return this.http.put(
      `${BASEURL}/document/add-document/${id}`,
      body
    );
  }

  editStatus(id, body): Observable<any> {
    return this.http.put(
      `${BASEURL}/document/update-status/${id}`,
      body
    );
  }
}
