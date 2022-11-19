import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  async login(): Promise<void> {
    console.log("Logging in...");
    let result = await this.authService.login(this.username, this.password);
    if (result)
      this.router.navigateByUrl('home');
    else
      alert('Invalid username or password');
  }

  gotoRegister() {
    this.router.navigateByUrl('register');
  }
}
