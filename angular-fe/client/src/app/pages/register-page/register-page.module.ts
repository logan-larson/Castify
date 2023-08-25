import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { RegisterPageRoutingModule } from './register-page-routing.module';

import { RegisterPageComponent } from './register-page.component';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, CoreModule, FormsModule, RegisterPageRoutingModule],
})
export class RegisterPageModule {}
