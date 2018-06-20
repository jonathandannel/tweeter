

$(document).ready(function() {

  function createTweetElement(tweet) {
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

  function renderTweets(data) {
    data.forEach((entry) => {
      createTweetElement(entry)
    });
  };

  function getLatest() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }) .done(function(data) {
          renderTweets(data);
        })
  }

  getLatest();


  $('#new-tweet').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
    method: "POST",
    url: "/tweets",
    data: $(this).serialize()
    })
    .done(function(data) {
      getLatest(data)
    })
  });
})
