import { Tweet } from './tweet.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
const BACKEND_URL = "http://localhost:3000/twitter/";

@Injectable({providedIn: 'root'})
export class TweetsService {
  private  tweets: Tweet[] = [];
  private tweetUpdated = new Subject<{tweets: Tweet[], tweetsCount: number}>();
  constructor(private http: HttpClient, private router: Router) {}

  getTweets(tweetPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${tweetPerPage}&page=${currentPage}`;
    this.http
    .get<{tweets: any, maxTweets: number }>(BACKEND_URL + '/tweetsget/' + queryParams)
    .pipe(map(tweetData => {
      return {tweets: tweetData.tweets.map(tweet => {
        return {
          id : tweet._id,
          text: tweet.text,
          created_at: tweet.created_at,
          created_by : tweet.created_by,
          filter : []
        };
      }), maxTweets: tweetData.maxTweets};
    })).subscribe((transformedtweetData) => {
      this.tweets = transformedtweetData.tweets;
      this.tweetUpdated.next({tweets: [...this.tweets], tweetsCount: transformedtweetData.maxTweets});
    });
  }
  // return an observable for the list of tweets to dynamiclly add tweet to user ui
  getTweetUpdateListener() {
    return this.tweetUpdated.asObservable();
  }

  navigateToAllTweets() {
    this.router.navigate(['/']);
  }
  
  searchTweets(tweetContent: string) {
    
    const tweetFilterData = tweetContent;
    this.http
        .get<{tweets: any}>(
          BACKEND_URL + 'tweetFilter/'+ tweetFilterData
        )
        .pipe(
          map(tweetData => {
            return {
              
              
              tweets: tweetData.tweets.map(data => {
                var indexs = [];
                data.matches.forEach(x => {
                  var index = x[0];
                  indexs.push(index);
                });
        
                return {
                  id : data.tweet._id,
                  text: data.tweet.text,
                  created_at: data.tweet.created_at,
                  created_by : data.tweet.created_by,
                  filter : indexs
                };
              })};
          })).subscribe(transformedtweetData => {
            
            this.tweets = transformedtweetData.tweets;
            this.tweetUpdated.next({tweets: [...this.tweets], tweetsCount: this.tweets.length});
          });



  }
}
