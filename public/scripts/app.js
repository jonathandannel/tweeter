let hardCodedData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
    $('.tweet-feed').append($html);
  };

  function renderTweets(data) {
    data.forEach((entry) => {
      createTweetElement(entry)
    });
  };

  renderTweets(hardCodedData);

});
