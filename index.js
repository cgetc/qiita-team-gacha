var http = require('http');
var config = require(('./config'));
var Starbucks = require('starbucks-egift-client');
var twiterBot = Starbucks.client(config['starbucks-egift-client']);

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
                gacha(payload.item.user);
                break;
            case 'comment':
                gacha(payload.comment.user);
                break;
            }
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Success\n');
        res.end();
    });
}).listen(config.port);

console.log('Server running at http://127.0.0.1:' + port + '/');

function gacha (user) {
    var seed = Math.floor(config.hit * Math.random());
    if (seed !== 0) {
        console.log('miss '+ user.url_name + '.('+seed+')');
        return false;
    }

    Qiita.Resources.User.get_user(user.url_name).then(function (user) {
        if (user.twitter_screen_name) {
            console.log('send to ' + user.id + '.');
            twiterBot.gift(user.twitter_screen_name, message(), message());
        } else {
            console.log('no twitter id(' + user.id + ')');
        }
    });
    return true;
}

function message() {
    var mess = config.messages,
        i = Math.floor(Math.random() * mess.length);
    return mess[i];
}