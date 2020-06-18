/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  /*-------------------- Helper Functions --------------------*/

  // escape XSS attack
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const renderTweets = function(tweets) {
    // clears the container before adding all of the tweets
    $('#tweets-container').empty();
    // loops through tweets
    for (const tweet of tweets) {

      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet)
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
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
            ${escape(tweetObj.content.text)}
          </p>
          <hr>
          <footer>
            <div>${tweetObj.created_at}</div>
            <div><i class="fa fa-flag" aria-hidden="true"></i> <i class="fa fa-share" aria-hidden="true"></i> <i class="fa fa-heart" aria-hidden="true"></i>
            </div>
          </footer>
        </article>`;
    return markup;
  };

  const loadTweets = function() {
    $.getJSON('/tweets')
      .then(function(tweets) {
        // calls renderTweets function passing all tweets from /tweets
        renderTweets(tweets);
      })
  };

  /*------------------------- Requests --------------------------*/

  $('#new-tweet').on('submit', function(event) {
    event.preventDefault();

    // checking for correct character length
    if ($('#tweet-text').val().length > 140 || !$('#tweet-text').val()) {
      $('.error-message').slideDown("slow", function() {
        $('error-message').css({'display': 'block'});
      });

    } else {
      $('.error-message').slideUp("slow", function() {
        $('error-message').css({'display': 'none'});
      });

    const data = $(this).serialize();

    $.post('/tweets', data)
      .then(function(tweetData) {

        $('#new-tweet')[0].reset();
        loadTweets();
      })
    }
  });

  loadTweets();
});