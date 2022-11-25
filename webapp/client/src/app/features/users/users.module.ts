import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from './users.service';
import { UserSearchCardComponent } from './components/user-search-card.component';

@NgModule({
  declarations: [UserSearchCardComponent],
  providers: [UsersService],
  imports: [
    CommonModule,
  ]
})
export class UsersModule { }
