import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): any {
    this.http.post<User>(`/api/users/user`, { username: username, password: password })
      .toPromise()
      .then(data => { console.log(data); return true })
      .catch(err => { console.log(err); return false });
  }
}
