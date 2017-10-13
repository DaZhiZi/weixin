var fs = require('fs')
var moment = require('moment')

const userModel = require('../model/user')
const todoModel = require('../model/todo')

var date = moment().format('HH:mm:ss')
var log = console.log.bind(console, date + ': ')

var sendHtml = function (response, path) {
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function (err, data) {
        if (err) {
            var msg = '你请求的网页不存在'
            response.send(msg)
        } else {
            response.send(data)
        }
    })
}

var sendJSON = function (response, data) {
    var r = JSON.stringify(data, null, 2)
    response.send(r)
}

const index = {
    path  : '/',
    method: 'get',
    func  : (request, response) => {
        var path = './static/html/index.html'
        sendHtml(response, path)
    }
}

var routes = [
    index
]

module.exports.routes = routes