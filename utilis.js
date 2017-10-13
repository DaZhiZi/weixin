var fs = require('fs')
const crypto = require('crypto')
var moment = require('moment')
const uuidv4 = require('uuid/v4')
var assert = require('assert')
var sha1 = require('sha1')
var date = moment().format('HH:mm:ss')
var log = console.log.bind(console, date + ': ')

//先解析markdown的文件信息，标题，时间等；
//使用模板引擎，对模板的标题和内容作出替换就行。
var b = { signature: '9ae2da2a275594d40552e299180fca9a768961f0',
    echostr: '17326687418298335167',
    timestamp: '1507868095',
    nonce: '3393414538'
}
let config = {
    wechat: {
        appID: "wx32f55c167a333096",
        appsecret: "c1c19e6d83ec0550f7865dfb79accbd0",
        //这里你得填写你自己设置的Token值
        token: "yongzhi",
    }
};

let token = config.wechat.token;
//获取请求中的signature
let signature = b.signature;
//获取请求中的timestamp
let timestamp = b.timestamp;
//获取请求中的nonce
let nonce = b.nonce;
//获取请求中的echostr
let echostr = b.echostr;
//将Token，timestamp，nonce按字典排序,排序后链接成一个字符串
let str = [token, timestamp, nonce].sort().join("");
//使用sha1模块进行sha1加密
let sha1Str = sha1(str);
log('str', sha1Str);

/*
//var MarkdownIt = require('markdown-it')
//var md = new MarkdownIt();
//var result = md.render('# markdown-it rulezz!');
//log(result)
//MongoDB的数据除了使用robomongo查看之外，在webstorm中如何查看自己的数据。
//database        collation       document        filed
//excel文件        sheet           row             字段

//mongo客户端
var MongoClient = require('mongodb').MongoClient
//数据库地址, 27017为保留端口。
var dbName = 'db-test'
var url = 'mongodb://localhost:27017/' + dbName
//assert 模块提供了断言测试的函数。

//对数据库进行增删改查时,需要先连接数据库,操作结束后再关闭数据库.

var insertDb = function (data) {
    //连接
    MongoClient.connect(url, function (err, db) {
        log('Connected successfully to server')
        var collection = db.collection('documents')
        // 插入
        collection.insertMany(data, function (err, result) {
            //关闭
            db.close()
        })
    })
}

var data = [{a: 'a1', b: 'b1'}]
//data类型为Array
//insertDb(data)
var findDb = function (queryCondition, callback) {
    MongoClient.connect(url, function (err, db) {
        log('Connected successfully to server')
        var collection = db.collection('documents')
        // 查询
        collection.find(queryCondition).toArray(function (err, docs) {
            callback(docs)
        })
    })
}
var query = {a:'a1'}
// 查询条件，query类型为Object。
// docs为查询结果，类型为Array。
// 当query = {}，空object时，查询全部。
findDb(query, function (docs) {
    log('docs', docs)
})

var updateOne = function (updateWhere, updateTo, callback) {
    MongoClient.connect(url, function (err, db) {
        log('Connected successfully to server')
        var collection = db.collection('documents')
        // 更新
        collection.updateOne(updateWhere, updateTo, callback)
    })
}

//updateOne({a: 'a1'}, {$set: {b: 'hui'}}, function (result) {
//    log('result', result)
//})

//updateDb函数，其参数含义如下
//updateWhere   更新的是哪一个数据
//updateTo      要更新成啥样，注意上述调用将{a:'test', b:'hui'} ————》 {b:'改成其他'}， 可以使用{$set:{b:'hui'}},设置要改动的选项，而不用在填写其他字段。
//callback      回调函数，result == null时，表示更新成功。
//注意， 该函数只更改查到的第一个匹配项。

//删除

var removeDb = function (deleteWhere, callback) {
    MongoClient.connect(url, function (err, db) {
        log('Connected successfully to server')
        var collection = db.collection('documents')
        // 更新
        collection.deleteOne(deleteWhere, callback)
    })
}

//removeDb({a:'a1'})
//同updateOne，只删除匹配的第一个

//创建索引
var indexDb = function (indexWhere, callback) {
    MongoClient.connect(url, function (err, db) {
        log('Connected successfully to server')
        var collection = db.collection('documents')
        // 更新
        collection.createIndex(indexWhere, callback)
    })
}

indexDb({a:1}, function (err, resluts) {
    log('resluts', resluts)
})
 */