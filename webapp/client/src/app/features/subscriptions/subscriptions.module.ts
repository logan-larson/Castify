/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { SubscriptionsComponent } from './components/subscriptions.component';

/* Services */
import { SubscriptionsService } from './subscriptions.service';

@NgModule({
  declarations: [SubscriptionsComponent],
  providers: [SubscriptionsService],
  imports: [CommonModule],
  exports: [SubscriptionsComponent],
})
export class SubscriptionsModule {}
