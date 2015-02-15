var mailer = require('nodemailer');
module.exports = {
    return {
        client: function (Starbucks, settings) {
            return {
                gift: function (mail, form) {
                    Starbucks.create_giftcard(form, function (url) {
                        if (mail.text) {
                            mail.text = mail.text + '\n' + url;
                        }
                        if (mail.html) {
                            mail.html = mail.html + '<br>' + url;
                        }
                        var smtp = mailer.createTransport(settings);
                        //メールの送信
                        smtp.sendMail(mail, function(err, res){
                            //送信に失敗したとき
                            if(err){
                                console.log(err);
                            //送信に成功したとき
                            }else{
                                console.log('Message sent: ' + res.message);
                            }
                            //SMTPの切断
                            smtp.close();
                        });
                    });
                }
            };
        }
    }
};