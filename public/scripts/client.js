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
  };

  const renderTweets = function(tweets) {
    // clears the container before adding all of the tweets
    $('#tweets-container').empty();
    // loops through tweets
    for (const tweet of tweets) {

      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
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
            <div class="timestamp">${loadTimestamp(tweetObj.created_at)}</div>
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
      });
  };

  // function to load correct timestamp
  const loadTimestamp = function(timestamp) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = Date.now() - timestamp;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';

    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago'
    
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';

    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }  

  /*------------------------- Requests --------------------------*/

  // STRETCH
  $('#nav-div').on('click', function() {
    if ($('section.new-tweet').css('display') === 'none') {
      $('section.new-tweet').slideDown("slow");
    } else if ($('section.new-tweet').css('display') !== 'none') {
      $('section.new-tweet').slideUp("slow");
    }
  });

  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();

    if (scrollTop > 500) {
      $('.scroll-button').css({ "display": "block" });
    } else {
      $('.scroll-button').css({ 'display': 'none' });
    }
  });

  $('.scroll-button').on('click', function() {
    $('section.new-tweet').slideDown("slow");
  })


  $('#new-tweet').on('submit', function(event) {
    event.preventDefault();

    // checking for correct character length
    if ($('#tweet-text').val().length > 140 || !$('#tweet-text').val()) {
      $('.error-message').slideDown("slow");

    } else {
      $('.error-message').slideUp("slow");

      const data = $(this).serialize();

      $.post('/tweets', data)
        .then(function(tweetData) {

          $('#new-tweet')[0].reset();
          loadTweets();
        });
    }
  });

  loadTweets();
});