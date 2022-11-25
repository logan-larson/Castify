import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUsersResult: User[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  async searchUsers(currentUserId: number, username: string, friendsOnly: boolean): Promise<User[] | null> {
    try {
      let friendsPath: string = friendsOnly ? '/friends' : '';
      let users = await this.http
        .get<User[]>(`/api/users/${currentUserId}${friendsPath}?username=${username}`)
        .toPromise();

      this.currentUsersResult = users;

      return this.currentUsersResult;
    } catch (error) {
      this.currentUsersResult = [];
      console.log('Error in searching for users');
      return null;
    }
  }
}
