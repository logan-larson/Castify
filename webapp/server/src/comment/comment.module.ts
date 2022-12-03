import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentController } from './comment.controller';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';


@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
