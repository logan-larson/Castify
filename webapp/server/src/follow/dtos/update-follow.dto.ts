export interface UpdateFollowDto {
  followerId: number;
  followeeId: number;
  followDate?: Date;
  unfollowDate?: Date;
}
