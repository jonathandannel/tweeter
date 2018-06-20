$(document).ready(function() {

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

  // Slide the New Tweet form when nav button is clicked
  $('.compose-btn').on('click', (e) => {
    $('.new-tweet').slideToggle('slow', () => {
      $('#user-input').focus();
    })
  })

  //ON FORM SUBMIT, POST TO /TWEETS AND REFRESH
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
  });

})
