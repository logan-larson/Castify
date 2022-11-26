import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Podcast } from './podcast.model';
import { SearchPodcastDto } from './dtos/searchPodcast.dto';
import { QueryTypes } from 'sequelize';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class PodcastService {

  constructor(
    @InjectModel(Podcast)
    private podcastModel: typeof Podcast,
    private sequelize: Sequelize,
    private subscriptionService: SubscriptionService
  ) {}

  async getAll(): Promise<SearchPodcastDto[]> {
    try {
      let podcasts = await this.sequelize.query<SearchPodcastDto>('SELECT * FROM Podcast', {
        type: QueryTypes.SELECT
      });

      return podcasts;
    } catch (err) {
      console.log('Error in getAll podcasts');
      console.log(err);
      return [];
    }
  }

  async findAllByName(queryStr: string): Promise<SearchPodcastDto[]> {
    try {
      let lowerQueryStr = queryStr.toString().toLowerCase();
      let podcasts = await this.sequelize.query<SearchPodcastDto>(
        `select podcast.podcastId, podcast.name, podcast.thumbnail, podcast.rssFeed, epcount.numEpisodes from 
          podcast join (select podcastId, count(*) as numEpisodes from episode group by podcastId)
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

  async findAllByNameWithEpCount(queryStr: string, queryNum: number, queryUid: number): Promise<SearchPodcastDto[]> {
    try {
      let lowerQueryStr = queryStr.toString().toLowerCase();
      let podcasts = await this.sequelize.query<SearchPodcastDto>(
        `select podcast.podcastId, podcast.name, podcast.thumbnail, podcast.rssFeed, epcount.numEpisodes from 
          podcast join (select podcastId, count(*) as numEpisodes from episode group by podcastId having count(*) >= ${queryNum})
          as epcount on podcast.podcastId = epcount.podcastId where lower(podcast.name) like '%${lowerQueryStr.toString()}%'`,

        /*`SELECT * FROM Podcast WHERE lower(Podcast.name) LIKE '%${lowerQueryStr.toString()}%'`,*/
        {
          type: QueryTypes.SELECT,
          replacements: {  }
        },
      );

      let subscribedPodcastIds = await this.subscriptionService.getUsersSubscriptions(queryUid);

      console.log(subscribedPodcastIds);

      podcasts.forEach(p => {
        subscribedPodcastIds.forEach(s => {
          if (p.podcastId == s.podcastId) {
            p.subscriptionStatus = 'subscribed';
          }
        })
      })

      return podcasts;
    } catch (error) {
      console.log('Error in findAllByName');
      console.log(error);
      return [];
    }
  }

}
