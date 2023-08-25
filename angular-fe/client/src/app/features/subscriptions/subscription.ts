export interface Subscription {
  userId: number;
  podcastId: number;
  subscribeDate?: Date;
  unsubscribeDate?: Date | null;
}