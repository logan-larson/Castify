import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  providers: [],
  exports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
})
export class CoreModule {}
