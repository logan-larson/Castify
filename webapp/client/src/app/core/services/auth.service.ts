import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/features/users/user';
import { Router } from '@angular/router';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  async login(username: string, password: string): Promise<number> {
    try {
      let user: User = await this.http
        .post<User>(`/api/users/user`, {
          username: username,
          password: password,
        })
        .toPromise();

      if (user) {
        return user.userId;
      }

      return -1;
    } catch (e) {
      return -1;
    }
  }

  async register(username: string, password: string): Promise<number> {
    try {
      let user: User = await this.http
        .post<User>(`/api/users`, { username: username, password: password })
        .toPromise();

      if (user) {
        return user.userId;
      }

      return -1;
    } catch (e) {
      return -1;
    }
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
