import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  
  currentView: string = 'subscriptions';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
  }

  changeView(view: string) {
    this.currentView = view;
  }

  logout() {
    this.authService.logout();
  }
}
