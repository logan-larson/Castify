import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SubscriptionsModule } from '@features/subscriptions/subscriptions.module';
import { SocialModule } from '@features/social/social.module';
import { SearchModule } from '@features/search/search.module';

import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    HomePageRoutingModule,
    SubscriptionsModule,
    SocialModule,
    SearchModule,
  ],
})
export class HomePageModule {}
