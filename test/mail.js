var server = require('node-http-server');
var config = require('../config');
var users = require('./data/users');
var port = 8080;
var Starbucks = require('starbucks-egift-client').client({
    site_url: 'http://localhost:' + port + '/mail/',
    capability:'chrome'
});
var client = require('../send-factory/MailSendFactory').client(Starbucks, {service:'sendmail'});

var Qiita = require('qiita-js');
Qiita.setToken(config.qiita.access_token);
Qiita.setEndpoint(config.qiita.endpoint);

server.deploy({
    root: './node_modules/starbucks-egift-client/test/mock',
    port: port
});


var hit = new Function(config.hit['arg'], 'return ' + config.hit['eval']);
function send (user_id) {
    Qiita.Resources.User.get_user(user_id).then(function (user) {
        if (!hit(user)) return;
        console.log('send to ' + user.id + '.');
        var setting = {
            'from': 'メール送信元',
            'to': users[user.id],
            'subject': 'Qiitaの投稿が' + user.items_count + '件達成しました!!' ,
            'text': message()
        };
        var form = Object.create(config.form, {
            card_message: message()
        });
        client.gift(setting, form);
    });
}

function message() {
    var mess = config.messages,
        i = Math.floor(Math.random() * mess.length);
    return mess[i];
}

send('QiitaのユーザID');