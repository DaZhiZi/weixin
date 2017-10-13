var fs = require('fs')
var session = require('cookie-session')
var crypto = require('crypto')
var moment = require('moment')

const userModel = require('../model/user')
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

const loginHtml = {
    path  : '/login',
    method: 'get',
    func  : (request, response) => {
        var obj = request.session
        if (userModel.valid(obj)) {
            response.redirect('/')
        } else {
            var path = './template/login.html'
            sendHtml(response, path)
        }
    }
}

const login = {
    path  : '/api/user/login',
    method: 'post',
    func  : (request, response) => {
        var obj = request.body
    
        var key = crypto.pbkdf2Sync(obj.password, 'i6*M*Q)Z9>)', 10, 16, 'sha512')
        obj.password = key.toString('hex')
    
        if (userModel.valid(obj)) {
            request.session = obj
            var data = '登陆成功'
            //response.redirect('/')
        } else {
            var data = '用户名或密码错误'
        }
        sendJSON(response, data)
    }
}

const logout = {
    path  : '/api/user/logout',
    method: 'post',
    func  : (request, response) => {
        request.session = null
        sendJSON(response, '你已注销')
    }
}

const register = {
    path  : '/api/user/register',
    method: 'post',
    func  : (request, response) => {
        var form = request.body
        var c = userModel.validRegister(form)
        if (c) {
            var data = userModel.new(form)
            request.session = data
        } else {
            var data = '用户名或密码不符合规范'
        }
        sendJSON(response, data)
    }
}

var routes = [
    login,
    logout,
    register,
    loginHtml,
]

module.exports.routes = routes