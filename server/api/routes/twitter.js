const express = require('express');
const Twitter = require('twitter');
const Tweet = require('../models/tweet');
var AhoCorasick = require('ahocorasick');
const router = express.Router();

var twitterClient = new Twitter({
    consumer_key: 'rtenIb8G3RvRDbKn12ry1O0lG',
    consumer_secret: 'TJQs8oA1CwsGSWVzywu0VQzDyqlywdvktpI5qw49qRHJBGJDB4',
    access_token_key: '878276697044525056-v81JZ3MMuD2BjCGVMBWLXW7Ava2L2Gv',
    access_token_secret: 'BDrh5kSTQDHwANgTuL5rxhGGwqJ4loZthAtnXVanKGJlj'
  });
  
  var params = {screen_name: 'adidas', count:100};
  
  router.get('/tweet',(req, res, next) => {
    twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (error)  return res.status(401).json({ message: 'No exist'});
      else{
          console.log(tweets);
        Tweet.collection.drop();
  
      tweets.forEach( (t) =>{
          const tweet = new Tweet({
              source_id: "" + t.id,
              text: t.text,
              created_at: t.created_at,
              created_by: params.screen_name
          });
          tweet.save();
        });
        return res.status(200).json({ message: 'Download '+params.count+' to DB'});
      }
      });
  });

  router.get('/tweetFilter/:id', (req, res, next) => {
    var ac = new AhoCorasick([req.params.id]);
      Tweet.find().exec().then(docs=> {
        var matches = [];
        docs.forEach(tweet => {
          var results = ac.search(tweet.text);
          if (results.length > 0) {
            matches.push({tweet: tweet, matches: results});
          }
        });
        return res.status(200).json({tweets: matches});
      });
  
  });
  router.get('/tweetsget', (req, res, next) => {
    const pageSize = + req.query.pageSize;
    const currentPage = + req.query.page;
    const tweetQuery = Tweet.find({}).select('text created_at created_by');
    let fetchTweets;
    if (pageSize && currentPage) {
      tweetQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    tweetQuery.then(documents => {
      fetchTweets = documents;
      return res.status(200).json({
          tweets: fetchTweets,
          maxTweets: params.count
        });
      });
    
  });
  
  
module.exports = router;