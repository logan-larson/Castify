import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Show } from './show.model';

@Injectable()
export class ShowService {

  constructor(
    @InjectModel(Show)
    private showModel: typeof Show,
    private sequelize: Sequelize
  ) { }

  async getAll(): Promise<Show[]> {
    try {
      let shows = await this.sequelize
        .query('SELECT * FROM Show', {
          model: Show,
          mapToModel: true
        })

      return shows;
    } catch (err) {
      console.log('Error in getAll shows');
      return [];
    }
  }
}
