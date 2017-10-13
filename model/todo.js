var fs = require('fs')
var moment = require('moment')
var date = moment().format('HH:mm:ss')
var log = console.log.bind(console, date + ': ')

var todoFilePath = 'db/todo.json'

const loadtodos = function () {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    // 注意, 一般都是这样不处理的
    var content = fs.readFileSync(todoFilePath, 'utf8')
    var todos = JSON.parse(content)
    return todos
}

var b = {
    data: loadtodos()
}

b.get = function (id) {
    var todos = this.data
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        if (todo.id == id) {
            var cs = []
            for (var j = 0; j < comments.length; j++) {
                var c = comments[j]
                if (todo.id == c.todo_id) {
                    cs.push(c)
                }
            }
            todo.comments = cs
            return todo
        }
    }
    // 循环结束都没有找到, 说明出错了, 那就返回一个空对象好了
    return {}
}

b.getBy = function (user_id) {
    var todos = this.data
    var userTodo = []
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        if (todo.user_id == user_id) {
            userTodo.push(todo)
        }
    }
    return userTodo
    //if (userTodo.length == 0) {
    //    return false
    //} else {
    //    return userTodo
    //}
}

b.all = function () {
    return this.data
}

b.new = function (form) {
    this.data.push(form)
    // 把 最新数据 保存到文件中
    this.save()
    // 返回新建的数据
    return form
}

b.find = function (id) {
    var index = undefined
    var todos = this.data
    var found = false
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        if (todo.id == id) {
            var index = i
            found = true
            break
        }
    }
    var obj = {
        index: index,
        found: found,
    }
    return obj
}

b.update = function (id, data) {
    var index = this.find(id).index
    this.data[index].task = data
    console.log('update data', data)
    this.save()
    return data
}
b.delete = function (id) {
    var index = this.find(id).index
    this.data.splice(index, 1)
    this.save()
    // 不返回数据也行, 但是还是返回一下好了
    return this.find(id).found
}

b.save = function () {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(todoFilePath, s, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('保存成功')
        }
    })
}

// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = b