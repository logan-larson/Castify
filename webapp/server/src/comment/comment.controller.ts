import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Patch,
  Query,
  Delete,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dtos/comment.dto';

@Controller('/api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  // -- Create comment --
  @Post()
  async createComment(@Body() commentDto: CommentDto): Promise<CommentDto> {
    try {
      console.log(commentDto);
      return await this.commentService.create(commentDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error in creating comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // -- Delete comment --
  @Delete()
  async deleteComment(@Query() queryParams): Promise<boolean> {
    try {
      return await this.commentService.delete(
        queryParams.userId,
        queryParams.episodeId,
      );
    } catch (err) {
      throw new HttpException(
        'Error in deleting comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
