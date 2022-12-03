/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentCardModule } from '@shared/comment-card/comment-card.module';

/* Components */
import { SocialComponent } from './components/social.component';

/* Services */
import { SocialService } from './social.service';

@NgModule({
  declarations: [SocialComponent],
  providers: [SocialService],
  imports: [CommonModule, FormsModule, CommentCardModule],
  exports: [SocialComponent],
})
export class SocialModule {}
