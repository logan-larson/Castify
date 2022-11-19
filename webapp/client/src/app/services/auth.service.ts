import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async login(username: string, password: string): Promise<boolean> {

    try {
      let data: User = await this.http.post<User>(`/api/users/user`, { username: username, password: password }).toPromise();

      console.log(data);

      return data != null;
    } catch (e) {
      return false;
    }
  }

  async register(username: string, password: string): Promise<boolean> {

    try {
      let data: User = await this.http.post<User>(`/api/users`, { username: username, password: password }).toPromise();

      console.log(data);

      return data != null;
    } catch (e) {
      return false;
    }
  }
}
