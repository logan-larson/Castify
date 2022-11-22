import { Controller, Get } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { Podcast } from './podcast.model';

@Controller('/api/podcasts')
export class PodcastController {

  constructor(private readonly podcastService: PodcastService) { }

  @Get()
  async getAllShows(): Promise<Podcast[]> {

    try {
      let shows = await this.podcastService.getAll();

      return shows;
    } catch (err) {
      return err;
    }
  }
}
