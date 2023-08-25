export interface SearchEpisodeDto  {
  
  episodeId: number,
  title: string,
  description: string,
  duration: number,
  releaseDate: Date,
  podcastId: number
  podcastThumbnail?: string,

}
