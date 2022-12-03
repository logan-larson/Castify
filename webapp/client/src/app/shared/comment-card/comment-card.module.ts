import { NgModule } from '@angular/core'
import { CoreModule } from '@core/core.module';

import { CommentCardComponent } from './comment-card.component';

@NgModule({
  declarations: [CommentCardComponent],
  imports: [CoreModule],
  exports: [CommentCardComponent]
})
export class CommentCardModule {}