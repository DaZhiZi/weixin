var fs = require('fs')
const crypto = require('crypto')
var moment = require('moment')
const uuidv4 = require('uuid/v4')

var config = require('./config')
var date = moment().format('HH:mm:ss')
var log = console.log.bind(console, date + ': ')
var userFilePath = 'db/user.json'

const loadUsers = function () {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    // 注意, 一般都是这样不处理的
    var content = fs.readFileSync(userFilePath, 'utf8')
    var users = JSON.parse(content)
    return users
}

var b = {
    data: loadUsers()
}

b.valid = function (form) {
    if (form.password == undefined) {
        return false
    }
    //log('form.password', form.password)
    var users = this.data
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
    
        var con1 = (user.username == form.username)
        var con2 = (user.password == form.password)
        if (con1 && con2) {
            return true
        }
    }
    return false
}

b.checkUsername = function (name) {
    if (name.length < 3) {
        return false
    }
    var users = this.data
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        var con = (user.username == name)
        if (con) {
            return false
        }
    }
    return true
}

b.validRegister = function (form) {
    //长度大于3
    var c1 = (form.password.length > 3)
    //用户名不重复
    var c2 = this.checkUsername(form.username)
    //log('form.password', form.password)
    return (c1 && c2)
}

b.get = function (id) {
    var users = this.data
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        if (user.user_id == id) {
            var cs = []
            for (var j = 0; j < comments.length; j++) {
                var c = comments[j]
                if (user.user_id == c.user_id) {
                    cs.push(c)
                }
            }
            user.comments = cs
            return user
        }
    }
    // 循环结束都没有找到, 说明出错了, 那就返回一个空对象好了
    return {}
}

b.getId = function (username) {
    var users = this.data
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        log('getId', user, user[username], user.username, username)
        if (user.username == username) {
            var id = user.user_id
            return id
        }
    }
    // 循环结束都没有找到, 说明出错了, 那就返回一个空对象好了
    return -1
}

b.all = function () {
    return this.data
}

b.new = function (form) {
    var key = crypto.pbkdf2Sync(form.password, config.salt, 10, 16, 'sha512')
    form.password = key.toString('hex')
    
    form.user_id = uuidv4()
    //log('new form', form)
    //添加用户ID
    // 把 数据 加入 this.data 数组
    this.data.push(form)
    // 把 最新数据 保存到文件中
    this.save()
    this.lastUserId = this.lastUserId + 1
    // 返回新建的数据
    return form
}

b.find = function (id) {
    var index = undefined
    var users = this.data
    var found = false
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        if (user.id == id) {
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
    fs.writeFile(userFilePath, s, (err) => {
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