var http = require('http');
var config = require(('./config'));
var Starbucks = require('starbucks-egift-client');
var twiterBot = Starbucks.twitterBot(config['starbucks-egift-client']);

var Qiita = require('qiita-js');
Qiita.setToken(config.qiita.access_token);
Qiita.setEndpoint(config.qiita.endpoint);

http.createServer(function (req, res) {
    var body = '';

    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', function() {
    var payload = JSON.parse(body);
    console.log(payload.model + ' ' + payload.action + ' ' + payload.item.uuid);
    if (payload.action === 'created') {
        switch (payload.model) {
        case 'item':
            send(payload.item.user.url_name);
            break;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Success\n');
        res.end();
    });
}).listen(config.port);

console.log('Server running at http://127.0.0.1:' + config.port + '/');

var hit = new Function('"' + config.hit.var + '"', '"return ' + config.hit.eval + '"');
function send (user_id) {
    Qiita.Resources.User.get_user(user_id).then(function (user) {
        if (!hit(user)) return;
        if (user.twitter_screen_name) {
            console.log('send to ' + user.id + '.');
            twiterBot.gift(user.twitter_screen_name, message(), message());
        } else {
            console.log('no twitter id(' + user.id + ')');
        }
    });
}

function message() {
    var mess = config.messages,
        i = Math.floor(Math.random() * mess.length);
    return mess[i];
}