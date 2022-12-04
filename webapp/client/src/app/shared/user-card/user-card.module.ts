import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';

import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [UserCardComponent],
  imports: [CoreModule],
  exports: [UserCardComponent],
})
export class UserCardModule {}
