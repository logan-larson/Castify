export interface Follow {
  followerId: number;
  followeeId: number;
  followDate: Date;
  unfollowDate?: Date;
}
