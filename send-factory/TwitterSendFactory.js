module.exports = {
    client: function (Starbucks, twitter_auth) {
        return Starbucks.twitterBot(twitter_auth);
    }
};