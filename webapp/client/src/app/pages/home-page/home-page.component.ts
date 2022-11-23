import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  currentView: string = 'subscriptions';

  constructor() {}

  ngOnInit(): void {}

  changeView(view: string) {
    this.currentView = view;
  }
}
