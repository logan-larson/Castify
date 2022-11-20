import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    if (this.searchType == 'user') {

    }
    console.log(this.searchType);
  }

}
