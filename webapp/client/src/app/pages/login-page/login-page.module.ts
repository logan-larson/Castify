import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-page-routing.module';

import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, CoreModule, FormsModule, LoginPageRoutingModule],
})
export class LoginPageModule {}
