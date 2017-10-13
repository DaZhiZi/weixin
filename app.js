var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var session = require('cookie-session')
var moment = require('moment')
let sha1 = require('sha1')
var wechat = require('wechat');

var date = moment().format('HH:mm:ss')
var log = console.log.bind(console, date + ': ')

var app = express()

app.use(session({
    secret: 'yongzhi',
    maxAge: 24000000,
}))

// 配置静态文件目录
app.use(express.static('static'))
app.use(bodyParser.json())

//app.use(function (req, res, next) {
//    var url = req.originalUrl
//    if (url != '/login' && !req.session.username) {
//        return res.redirect('/login')
//    }
//    next()
//})

//微信订阅号的配置信息
let config = {
    wechat: {
        appID    : 'wx32f55c167a333096',
        appsecret: 'c1c19e6d83ec0550f7865dfb79accbd0',
        //这里你得填写你自己设置的Token值
        token    : 'yongzhi',
    },
    token: 'yongzhi',
    appid: 'wx32f55c167a333096',
    checkSignature: true // 可选，默认为true。
}
app.use(express.query());
//需要去掉微信验证，要不然res.reply();两次，导致error
app.use('*', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    log('message', message)
    if (message.Content === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.Content === 'hehe') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 回复高富帅(图文回复)
        res.reply([
            {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
            }
        ]);
    }
}));

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    log(`应用实例，访问地址为 http://${host}:${port}`)
})
