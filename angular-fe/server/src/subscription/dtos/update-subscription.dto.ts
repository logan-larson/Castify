export interface UpdateSubscriptionDto {

  userId: number,
  podcastId: number,
  subscribeDate?: Date,
  unsubscribeDate: Date

}