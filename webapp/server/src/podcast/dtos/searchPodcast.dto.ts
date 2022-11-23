export class SearchPodcastDto  {
  podcastId: number;
  name: string;
  thumbnail: string;
  rssFeed: string;
  numEpisodes: number;

  constructor(
    d: { podcastId: number, name: string, thumbnail: string, rssFeed: string, numEpisodes: number }
  ) {
    this.podcastId = d.podcastId;
    this.name = d.name;
    this.thumbnail = d.thumbnail;
    this.rssFeed = d.rssFeed;
    this.numEpisodes = d.numEpisodes;
  }
}
