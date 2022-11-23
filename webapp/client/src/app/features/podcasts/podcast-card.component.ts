import { Component, Input, OnInit } from '@angular/core';
import { Podcast } from 'src/app/features/podcasts/podcast';

@Component({
  selector: 'app-podcast-card',
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.css'],
})
export class PodcastCardComponent implements OnInit {
  @Input() podcast!: Podcast;

  constructor() {}

  ngOnInit(): void {}
}
