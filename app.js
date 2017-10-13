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

app.use(function (request, response) {
    //ctx.query获取请求中携带的参数
    let token = config.wechat.token
    //获取请求中的signature
    let signature = request.query.signature
    //获取请求中的timestamp
    let timestamp = request.query.timestamp
    //获取请求中的nonce
    let nonce = request.query.nonce
    //获取请求中的echostr
    let echostr = request.query.echostr
    //将Token，timestamp，nonce按字典排序,排序后链接成一个字符串
    let str = [token, timestamp, nonce].sort().join('')
    //使用sha1模块进行sha1加密
    let sha1Str = sha1(str)
    //判断加密后的字符串与请求中signature是否相等
    //如果相等返回echostr
    if (sha1Str === signature) {
        //将echostr返回给微信服务器
        response.send(echostr)
    } else {
        response.send("不是来自微信的请求")
    }
})

app.use('/', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.FromUserName === 'hehe') {
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

const registerRoutes = (app, routes) => {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        app[route.method](route.path, route.func)
    }
}

var _routeFunc = function () {
    const routePath = './route'
    var names = fs.readdirSync(routePath)
    for (var i = 0; i < names.length; i++) {
        var routeName = './route/' + names[i]
        const routeIndex = require(routeName)
        registerRoutes(app, routeIndex.routes)
    }
}

//_routeFunc()


var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    log(`应用实例，访问地址为 http://${host}:${port}`)
})
