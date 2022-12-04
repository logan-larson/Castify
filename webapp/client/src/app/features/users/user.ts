export interface User {
  userId: number;
  username: string;
  password: string;
  avatar: string;
  joinDate: Date;
  isActive: boolean;

  followingStatus?: string;
}
