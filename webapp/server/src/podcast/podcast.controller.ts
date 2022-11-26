import { Controller, Get, Query } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { Podcast } from './podcast.model';
import { SearchPodcastDto } from './dtos/searchPodcast.dto';

@Controller('/api/podcasts')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Get()
  async getAllPodcasts(@Query() queryParams): Promise<SearchPodcastDto[]> {
    try {
      //let podcasts = await this.podcastService.getAll();
      let podcasts = await this.podcastService.findAllByName(queryParams.name);

      return podcasts;
    } catch (err) {
      return err;
    }
  }

  @Get('count')
  async getAllPodcastsWithEpCount(@Query() queryParams): Promise<SearchPodcastDto[]> {
    try {
      //let podcasts = await this.podcastService.getAll();
      let podcasts = await this.podcastService.findAllByNameWithEpCount(queryParams.name, queryParams.count, queryParams.userId);

      return podcasts;
    } catch (err) {
      return err;
    }
  }
}
