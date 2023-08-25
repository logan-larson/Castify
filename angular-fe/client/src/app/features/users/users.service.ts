import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { AuthService } from '@core/services/auth.service';
import { Follow } from './follow';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentUsersResult: User[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  async searchUsers(
    currentUserId: number,
    username: string,
    friendsOnly: boolean
  ): Promise<User[] | null> {
    try {
      let friendsPath: string = friendsOnly ? '/friends' : '';
      let users = await this.http
        .get<User[]>(
          `/api/users/${currentUserId}${friendsPath}?username=${username}`
        )
        .toPromise();

      this.currentUsersResult = users;

      console.log(users);

      return this.currentUsersResult;
    } catch (error) {
      this.currentUsersResult = [];
      console.log('Error in searching for users');
      return null;
    }
  }

  async createFollow(followerId: number, followeeId: number): Promise<boolean> {
    try {
      console.log(`followerId: ${followerId} | followeeId: ${followeeId}`);
      let res: Follow = await this.http
        .post<Follow>(`/api/users/${followerId}/follows/${followeeId}`, {
          dummy: 'dummy_body',
        })
        .toPromise();

      console.log(res);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async changeFollowingStatus(
    followerId: number,
    followeeId: number,
    status: string
  ): Promise<boolean> {
    try {
      await this.http
        .patch<boolean>(
          `/api/followers/${followerId}/followees/${followeeId}`,
          {
            status: status,
          }
        )
        .toPromise();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
