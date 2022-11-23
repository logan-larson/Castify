import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from './components/subscriptions.component';

@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [CommonModule],
  exports: [SubscriptionsComponent],
})
export class SubscriptionsModule {}
