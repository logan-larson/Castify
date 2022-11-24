import { Controller, Get, Query } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { Episode } from './episode.model';
import { SearchEpisodeDto } from './dtos/searchEpisode.dto';

@Controller('/api/episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  async getAllEpisodes(@Query() queryParams): Promise<SearchEpisodeDto[]> {
    try {
      //let podcasts = await this.podcastService.getAll();
      let episodes = await this.episodeService.getAll();

      return episodes;
    } catch (err) {
      return err;
    }
  }

  @Get('sort')
  async getAllEpisodesSorted(@Query() queryParams): Promise<SearchEpisodeDto[]> {
    try {
      //let podcasts = await this.podcastService.getAll();
      let episodes = await this.episodeService.findAllByNameWithSorting(queryParams.title, queryParams.sort);

      return episodes;
    } catch (err) {
      return err;
    }
  }
}
