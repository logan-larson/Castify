export interface CreateCommentDto {

  userId: number,
  episodeId: number,
  commentDesc: string,
  timestampStart: number,
  timestampEnd: number

}