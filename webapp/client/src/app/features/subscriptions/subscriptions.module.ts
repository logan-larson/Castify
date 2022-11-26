/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastCardModule } from '@shared/podcast-card/podcast-card.module';

/* Components */
import { SubscriptionsComponent } from './components/subscriptions.component';

/* Services */
import { SubscriptionsService } from './subscriptions.service';

@NgModule({
  declarations: [SubscriptionsComponent],
  providers: [SubscriptionsService],
  imports: [CommonModule, PodcastCardModule],
  exports: [SubscriptionsComponent],
})
export class SubscriptionsModule {}
