$(document).ready(function() {

  const createTweetElement = (tweet) => {
    let $html = `
    <article class="tweet-container">
      <header>
        <img class="avatar" src=${tweet.user.avatars.small}>
        <div class="name">
          <h3>${tweet.user.name}</h3>
          <span class="username">${tweet.user.handle}</span>
        </div>
      </header>
      <p class="tweet-body">
         ${tweet.content.text}
      </p>
      <hr></hr>
      <footer>
        <span class="post-time"></span>
        <span class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-share-square"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
    `
    $('.tweet-feed').prepend($html);
  };

  // LOOP THROUGH DATA AND RETURN HTML ELEMENT WITH VARIABLES FILLED
  const renderTweets = (data) => {
    data.forEach((entry) => {
      createTweetElement(entry)
    });
  };

  // CALL RENDER TWEETS ON AJAX GET SUCCESS
  const getLatest = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }) .done((result) => {
          $('.tweet-feed').empty();
          renderTweets(result);
        })
  };

  // GET ALL TWEETS ON PAGE LOAD
  getLatest();

  //ON FORM SUBMIT, POST TO /TWEETS AND EMPTY THE TWEET FEED THEN GET ALL AGAIN
  $('#new-tweet').on('submit', function(e) {
    e.preventDefault();
    let userInput = $(this).children('textarea').val().trim();
    let inputErrors = [];

    if (userInput === null || userInput === "") {
      inputErrors.push('Invalid input.')
    } else if (userInput.length > 140) {
      inputErrors.push('Maximum character limit: 140')
    }

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
        alert(error);
      })
    }
  });

})
