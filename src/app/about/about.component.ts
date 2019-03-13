import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { MatPaginator, MatDialog, PageEvent } from '@angular/material';
import { Tweet } from './tweet.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TweetsService } from './tweets.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator)
    set matPaginator(paginator: MatPaginator) {
      setTimeout(() => {
        if (((this.currentPage - 1) * this.tweetsPerPage + 1) === this.totalTweets && this.isDeleteProblem) {
          this.currentPage = 1;
          this.totalTweets -= 1;
          paginator.pageIndex = 0;
          paginator.length = this.totalTweets;
          this.isDeleteProblem = false;
        }
       }, 0);
  }
  filtertext : string ="";
  tweets: Tweet[] = [];
  isLoading = false;
  paging = true;
  totalTweets = 0;
  tweetsPerPage = 10;
  currentPage = 1;
  userIsAuthenticated = false;
  isFilter = false;
  form: NgForm;
  pageSizeOptions = [1, 2, 5, 10];
  private tweetsSub: Subscription;
  private authStatusSub: Subscription;
  private isDeleteProblem = false;
  constructor(public tweetsService: TweetsService,private dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.tweetsService.getTweets(this.tweetsPerPage, this.currentPage);
    this.tweetsSub = this.tweetsService.getTweetUpdateListener().subscribe((tweetData: {tweets: Tweet[], tweetsCount: number}) => {
      this.tweets = tweetData.tweets;
      this.totalTweets = tweetData.tweetsCount;
      this.isLoading = false;
    });

  }

// need to edit
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.tweetsPerPage = pageData.pageSize;
    if (!this.isFilter) {
    this.tweetsService.getTweets(this.tweetsPerPage, this.currentPage);
    } else {
    }
  }

  
  onSearch(form: NgForm) {

    
    this.isFilter = true;
    this.form = form;
    this.filtertext = form.value.content.trim();
    if(this.filtertext === "")
    {
      this.isFilter = false;
     this.onAllTweets();
    }
    else{
     
      this.tweetsService.searchTweets(
        this.filtertext
      );
    }
    
  }
  onAllTweets() {
    this.isFilter = false;
    this.tweetsService.getTweets(2, 1);
  }

  ngOnDestroy() {
    this.tweetsSub.unsubscribe();


  }
}

