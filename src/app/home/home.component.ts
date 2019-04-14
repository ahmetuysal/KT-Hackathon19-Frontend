import { Component, OnInit } from '@angular/core';
import { FundraisingPost } from '../shared/models/fundraising-post.model';
import { EquityFundingPost } from '../shared/models/equity-funding-post.model';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  equityFundingPosts: EquityFundingPost[];
  fundraiserPosts: FundraisingPost[];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => {
      console.log(data);
      this.equityFundingPosts = data['data'].equityFundingPosts;
      this.fundraiserPosts = data['data'].fundraiserPosts;
    });
    console.log(this.equityFundingPosts);
    console.log(this.fundraiserPosts);
  }
}
