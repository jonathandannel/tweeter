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
          renderTweets(result);
        })
  };


  // GET ALL TWEETS ON PAGE LOAD
  getLatest();

  //ON FORM SUBMIT, POST TO /TWEETS AND EMPTY THE TWEET FEED THEN GET ALL AGAIN
  $('#new-tweet').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
    method: "POST",
    url: "/tweets",
    data: $(this).serialize()
    })
      .done(() => {
        $('.tweet-feed').empty();
        getLatest();
      })
  });

})
