import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Podcast } from './podcast.model';

@Injectable()
export class PodcastService {
  constructor(
    @InjectModel(Podcast)
    private podcastModel: typeof Podcast,
    private sequelize: Sequelize,
  ) {}

  async getAll(): Promise<Podcast[]> {
    try {
      let podcasts = await this.sequelize.query('SELECT * FROM Podcast', {
        model: Podcast,
        mapToModel: true,
      });

      return podcasts;
    } catch (err) {
      console.log('Error in getAll podcasts');
      console.log(err);
      return [];
    }
  }

  async findAllByName(queryStr: string): Promise<Podcast[]> {
    try {
      let lowerQueryStr = queryStr.toString().toLowerCase();
      let podcasts = await this.sequelize.query(
        `SELECT * FROM Podcast WHERE lower(Podcast.name) LIKE '%${lowerQueryStr.toString()}%'`,
        {
          model: Podcast,
          mapToModel: true,
        },
      );

      return podcasts;
    } catch (error) {
      console.log('Error in findAllByName');
      console.log(error);
      return [];
    }
  }
}
