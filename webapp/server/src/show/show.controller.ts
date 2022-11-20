import { Controller, Get } from '@nestjs/common';
import { ShowService } from './show.service';
import { Show } from './show.model';

@Controller('/api/shows')
export class ShowController {

  constructor(private readonly showService: ShowService) { }

  @Get()
  async getAllShows(): Promise<Show[]> {

    try {
      let shows = await this.showService.getAll();

      return shows;
    } catch (err) {
      return err;
    }
  }
}
