
export interface Podcast {

  podcastId: number,
  name: string,
  thumbnail: string,
  rssFeed: string,
  numEpisodes?: number;
  subscriptionStatus?: string;

}