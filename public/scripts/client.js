/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {

      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet)
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };

  const createTweetElement = function(tweetObj) {
    const markup = `
    <article class="tweet">
          <header>
            <div class="avatar-div">
            <img src="${tweetObj.user.avatars}" alt="Avatar of user" />${tweetObj.user.name}
            </div>
            <div class="handle">${tweetObj.user.handle}</div>
          </header>
          <p>
            ${tweetObj.content.text}
          </p>
          <hr>
          <footer>
            <div>${tweetObj.created_at}</div>
            <div>Save Share Like</div>
          </footer>
        </article>`;
    return markup;
  };

  renderTweets(data);
});