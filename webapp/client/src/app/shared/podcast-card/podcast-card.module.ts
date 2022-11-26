import { NgModule } from '@angular/core'
import { CoreModule } from '@core/core.module';

import { PodcastCardComponent } from './podcast-card.component';

@NgModule({
  declarations: [PodcastCardComponent],
  imports: [CoreModule],
  exports: [PodcastCardComponent]
})
export class PodcastCardModule {}