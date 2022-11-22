import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Podcast } from 'src/app/models/podcast';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  searchShow() {
    this.http.get<Podcast[]>(`/api/podcasts`)
  }

  searchEpisode() {

  }

  searchUser() {

  }
}
