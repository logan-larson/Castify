import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Podcast } from './podcast.model';

@Injectable()
export class PodcastService {

  constructor(
    @InjectModel(Podcast)
    private podcastModel: typeof Podcast,
    private sequelize: Sequelize
  ) { }

  async getAll(): Promise<Podcast[]> {
    try {
      let podcasts = await this.sequelize
        .query('SELECT * FROM Podcast', {
          model: Podcast,
          mapToModel: true
        })

      return podcasts;
    } catch (err) {
      console.log('Error in getAll podcasts');
      return [];
    }
  }
}
