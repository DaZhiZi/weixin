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

const all = {
    path  : '/api/todo/all',
    method: 'get',
    func  : (request, response) => {
        var username = request.session.username
        var user_id = userModel.getId(username)
        var todoList = todoModel.getBy(user_id)
        log('all todo ', username, typeof username, user_id)
        sendJSON(response, todoList)
    }
}

const add = {
    path  : '/api/todo/add',
    method: 'post',
    func  : (request, response) => {
        var form = request.body
        var username = request.session.username
        form.user_id = userModel.getId(username)
        log('todo add username', username)
        var todo = todoModel.new(form)
        sendJSON(response, todo)
    }
}

const deleteTodo = {
    path  : '/api/todo/delete/:id',
    method: 'get',
    func  : (request, response) => {
        var id = request.params.id
        var todo = todoModel.delete(id)
        sendJSON(response, todo)
    }
}

const update = {
    path  : '/api/todo/update/:id',
    method: 'post',
    func  : (request, response) => {
        var data = request.body
        var todo = todoModel.update(data.id, data.task)
        sendJSON(response, todo)
    }
}
var routes = [
    all,
    add,
    deleteTodo,
    update,
]

module.exports.routes = routes