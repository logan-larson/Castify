import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentView: string = 'subscriptions';

  constructor() { }

  ngOnInit(): void {
  }

  changeView(view: string) {
    this.currentView = view;
  }

}
