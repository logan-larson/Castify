import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async register() {
    console.log('Registering...');
    let result = await this.authService.register(this.username, this.password);

    if (result) this.router.navigateByUrl('home');
    else alert('Username already taken');
  }

  gotoLogin() {
    this.router.navigateByUrl('login');
  }
}
