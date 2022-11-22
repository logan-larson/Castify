import { Controller, Get, Query } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { Podcast } from './podcast.model';

@Controller('/api/podcasts')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Get()
  async getAllPodcasts(@Query() queryParams): Promise<Podcast[]> {
    try {
      //let podcasts = await this.podcastService.getAll();
      let podcasts = await this.podcastService.findAllByName(queryParams.name);

      return podcasts;
    } catch (err) {
      return err;
    }
  }
}
