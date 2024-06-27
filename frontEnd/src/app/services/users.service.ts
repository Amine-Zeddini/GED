import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  GetAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/users`);
  }

  GetUserById(id): Observable<any> {
    return this.http.get(`${BASEURL}/user/${id}`);
  }

  updateUserById(id, user): Observable<any> {
    return this.http.put(`${BASEURL}/user/${id}`, user);
  }
  GetUserByName(username): Observable<any> {
    return this.http.get(`${BASEURL}/username/${username}`);
  }



 

  AddImage(image): Observable<any> {
    return this.http.post(`${BASEURL}/upload-image`, {
      image,
    });
  }

  SetDefaultImage(imageId, imageVersion): Observable<any> {
    return this.http.get(
      `${BASEURL}/set-default-image/${imageId}/${imageVersion}`
    );
  }

 
  ChangePassword(body): Observable<any> {
    return this.http.post(`${BASEURL}/change-password`, body);
  }

  DeleteUser(id): Observable<any> {
    return this.http.delete(`${BASEURL}/user/delete-user/${id}`);
  }

 
}
