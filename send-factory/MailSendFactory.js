module.exports = {
    client: function (Starbucks, settings) {
        var sendmail, _sendmail, smtp;
        if (settings.service == 'sendmail') {
            _sendmail = require('sendmail')();
            sendmail = function(url, mail, callback) {
                mail.content = (mail.text || mail.html || mail.content) + '\n' + url;
                _sendmail(mail, callback);
            }
        } else {
            smtp = require('nodemailer').createTransport(settings);
            sendmail = function (url, mail, callback) {
                if (mail.text) {
                    mail.text = mail.text + '\n' + url;
                }
                if (mail.html) {
                    mail.html = mail.html + '<br>' + url;
                }
                smtp.sendMail(mail, function () {
                    callback.apply(this, arguments);
                    //SMTPの切断
                    smtp.close();
                });
            }
        }
        return {
            gift: function (mail, form) {
                Starbucks.create_giftcard(form, function (url) {
                    //メールの送信
                    sendmail(url, mail, function(err, res){
                        //送信に失敗したとき
                        if(err){
                            console.log(err);
                        //送信に成功したとき
                        }else{
                            console.log('Message sent: ' + res.message);
                        }
                    });
                });
            }
        };
    }
};