module.exports = {
    port: 1337,/* 動作させるport番号 */
    qiita: {
        access_token: 'Qiita:Teamのアクセストークン',
        endpoint: 'Qiita:Teamのurl'
    },
    hit: {/* 報酬を与える関数定義 */
        arg: 'user', /* 関数の引数 */
        eval: '(user.items_count === 10) || (user.items_count === 50) || (user.items_count % 100 === 0)' /* 関数の条件(boolean) */
    },
    messages: [/* 以下の投稿メッセージがランダムで使わる */
        'いつも投稿ありがとう。あなたのおかげでチームのみんなが助かっているわ。これは私から頑張ってるあなたへプ・レ・ゼ・ン・ト♥',
        'お疲れ様。頑張ってるあなたへ私からプ・レ・ゼ・ン・ト♥',
        'あなたのその優しさに助けられてる人がたくさんいるわ、ありがとう♥'
    ],
    'starbucks-egift-client': {/* Starbucks-eGift-Clientの設定 */
        webdriver: {
            remote_url: 'Selenium-RCを使用する場合はURLを指定(任意）',
            capability: 'chromeもしくはfirefoxを指定'
        },
        twitter: {
            username: 'twitterのID',
            password: 'twitterのパスワード'
        },
        starbucks: {
            mail_address: '決済通知用のメールアドレス',
            credit: {
                numbers: 'クレジットカード番号',
                month: 'クレジットカードの有効期限(月)',
                year: 'クレジットカードの有効期限(年)'
            }
        }
    }
}