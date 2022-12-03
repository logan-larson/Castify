export interface Comment {
  userId: number,
  episodeId: number,
  commentDesc: string,
  commentDate: Date,
  timestampStart: number,
  timestampEnd: number,
}