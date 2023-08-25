export interface FollowDto {
  followerId: number;
  followeeId: number;
  followDate: Date;
  unfollowDate?: Date;
}
