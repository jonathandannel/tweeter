$(document).ready(function() {

  /* Create HTML 'template' with all tweet/user details */
  const createTweetElement = (tweet) => {
    const escape = (str) => {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $html = `
    <article class="tweet-container">
      <header>
        <img class="avatar" src=${escape(tweet.user.avatars.small)}>
        <div class="name">
          <h3>${escape(tweet.user.name)}</h3>
          <span class="username">${escape(tweet.user.handle)}</span>
        </div>
      </header>
      <p class="tweet-body">
         ${escape(tweet.content.text)}
      </p>
      <hr></hr>
      <footer>
        <span class="post-time">${moment(tweet.created_at).fromNow()}</span>
        <span class="icons">
          <i class="fas fa-flag" href="#"></i>
          <i class="fas fa-share-square href="#"></i>
          <i class="fas fa-heart" href="#"></i>
        </span>
      </footer>
    </article>
    `
    $('.tweet-feed').prepend($html);
  };

  /* Return HTML template populated with values for each element in database */
  const renderTweets = (data) => {
    data.forEach((entry) => {
      createTweetElement(entry)
    });
  };

  /* GET request to /tweets, but empty the container first so there are no duplicatees */
  const getLatest = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
    .done((result) => {
      $('.tweet-feed').empty();
      renderTweets(result);
    })
  };

  /* Get all tweets from /tweets on page load */
  getLatest();

  /* Show/hide New Tweet form when button is clicked */
  $('.compose-btn').on('click', () => {
    $('.new-tweet').slideToggle('slow', () => {
      $('#user-input').focus();
    })
  })

  /* On form submit: Validate content, do AJAX POST request to /tweets, serialize data, run getLatest() on success */
  $('#new-tweet').on('submit', function(e) {
    e.preventDefault();
    $('.input-errors').empty();
    let userInput = $(this).children('textarea').val().trim();
    let inputErrors = [];

    if (userInput === null || userInput === "") {
      inputErrors.push('Tweets cannot be empty.');
    } else if (userInput.length > 140) {
      inputErrors.push('Maximum character limit: 140');
    }

    /* Make AJAX request if valid input */
    if (inputErrors.length === 0) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      })
      .done(() => {
        getLatest();
      });
    } else {
      inputErrors.forEach((error) => {
        $('.input-errors').text(error);
      })
    }

    /* Clear text area */
    $(this).children('textarea').val('');
  });

})
