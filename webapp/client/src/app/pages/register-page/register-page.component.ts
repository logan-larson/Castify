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
    let userId = await this.authService.register(this.username, this.password);

    if (userId != -1) {
      this.router.navigateByUrl('home');
      localStorage.setItem('userId', userId.toString());
    }
    else alert('Username already taken');
  }

  gotoLogin() {
    this.router.navigateByUrl('login');
  }
}
