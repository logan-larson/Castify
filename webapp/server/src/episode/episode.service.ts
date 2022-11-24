import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Episode } from './episode.model';
import { SearchEpisodeDto } from './dtos/searchEpisode.dto';
import { QueryTypes } from 'sequelize';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Episode)
    private episodeModel: typeof Episode,
    private sequelize: Sequelize,
  ) {}

  async getAll(): Promise<SearchEpisodeDto[]> {
    try {
      let episodes = await this.sequelize.query<SearchEpisodeDto>('SELECT * FROM Episode', {
        type: QueryTypes.SELECT
      });

      return episodes;
    } catch (err) {
      console.log('Error in getAll episodes');
      console.log(err);
      return [];
    }
  }

  /*
  async findAllByName(queryStr: string): Promise<SearchEpisodeDto[]> {
    try {
      let lowerQueryStr = queryStr.toString().toLowerCase();
      let episodes = await this.sequelize.query<SearchEpisodeDto>(
        `SELECT Episode.podcastId, Episode.name, Episode.thumbnail, Episode.rssFeed, epcount.numEpisodes from 
          episode join (select podcastId, count(*) as numEpisodes from episode group by podcastId)
          as epcount on podcast.podcastId = epcount.podcastId where podcast.name like '%${lowerQueryStr.toString()}%'`,
          {
            type: QueryTypes.SELECT
          }
      );

      console.log(podcasts);

      return podcasts;
    } catch (error) {
      console.log('Error in findAllByName');
      console.log(error);
      return [];
    }
  }
  */

  async findAllByNameWithSorting(queryStr: string, sortParam: string): Promise<SearchEpisodeDto[]> {
    try {
      let lowerQueryStr = queryStr.toString().toLowerCase();
      let orderByClause = '';
      if (sortParam == 'title') {
        orderByClause = 'ORDER BY Episode.title ASC';
      } else if (sortParam == 'duration') {
        orderByClause = 'ORDER BY Episode.duration ASC';
      } else if (sortParam == 'releaseDate') {
        orderByClause = 'ORDER BY Episode.releaseDate ASC';
      }

      let episodes = await this.sequelize.query<SearchEpisodeDto>(
        `SELECT episode.episodeId, episode.title, episode.description, episode.duration,
          episode.releaseDate, episode.podcastId, podcast.thumbnail
          FROM episode JOIN podcast ON episode.podcastId = podcast.podcastId
          WHERE episode.title LIKE '%${lowerQueryStr}%' ${orderByClause}`,
        {
          type: QueryTypes.SELECT,
        },
      );

      return episodes;
    } catch (error) {
      console.log('Error in findAllByName episodes');
      console.log(error);
      return [];
    }
  }

}
