console.log("CSTA Retweet Bot");
// require("dotenv").config();
require("dotenv").config();

var twit = require("twit");
var config = require("./config.js");

var Twitter = new twit(config);

var debugging = false;
if (debugging) {
  Twitter.get(
    "search/tweets",
    { q: "list:1579932130855251969", count: 10 },
    function (err, data, response) {
      console.log(data);
    }
  );
} else {
  // find latest tweet according the query 'q' in params
  var retweet = function () {
    let currentdate = new Date();
    let datetime =
      "Last Sync: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    console.log(datetime);

    var params = {
      q: "list:1579932130855251969", // REQUIRED
      result_type: "recent",
      lang: "en",
    };
    // for more parameters, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get("search/tweets", params, function (err, data) {
      // if there no errors
      let retweetId;
      if (!err && data.statuses.length > 1) {
        console.log(
          "Tweeting: " +
            data.statuses[0].id_str +
            " Message: " +
            data.statuses[0].text +
            " Date: " +
            data.statuses[0].created_at
        );
        // grab ID of tweet to retweet
        retweetId = data.statuses[0].id_str;
        // Tell TWITTER to retweet
        Twitter.post(
          "statuses/retweet/:id",
          {
            id: retweetId,
          },
          function (err, response) {
            if (response) {
              console.log("Retweeted!!!");
            }
            // if there was an error while tweeting
            if (err) {
              console.log(
                "Something went wrong while RETWEETING... Duplication maybe..."
              );
              console.log(err.allErrors);
            }
          }
        );
      }
      // if unable to Search a tweet
      else {
        console.log("Something went wrong while SEARCHING...");
        console.log(err.allErrors);
      }

      if (!err && data.statuses.length > 2) {
        console.log(
          "Tweeting: " +
            data.statuses[1].id_str +
            " Message: " +
            data.statuses[1].text +
            " Date: " +
            data.statuses[0].created_at
        );
        // grab ID of tweet to retweet
        retweetId = data.statuses[1].id_str;
        // Tell TWITTER to retweet
        Twitter.post(
          "statuses/retweet/:id",
          {
            id: retweetId,
          },
          function (err, response) {
            if (response) {
              console.log("Retweeted!!!");
            }
            // if there was an error while tweeting
            if (err) {
              console.log(
                "Something went wrong while RETWEETING... Duplication maybe..."
              );
              console.log(err.allErrors);
            }
          }
        );
      }
    });
  };

  retweet();

  // setInterval(retweet, 300000);
}
