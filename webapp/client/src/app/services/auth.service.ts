import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async login(username: string, password: string): Promise<boolean> {
    let user = await this.http.post(`/api/user`, { username: username, password: password }).toPromise();
    console.log(user);

    return user != undefined;
  }
}
