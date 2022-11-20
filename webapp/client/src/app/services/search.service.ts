import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Show } from 'src/app/models/show';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  searchShow() {
    this.http.get<Show[]>(`/api/`)
  }

  searchEpisode() {

  }

  searchUser() {

  }
}
