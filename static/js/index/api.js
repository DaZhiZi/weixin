

var apiTodoAdd = function (data, callback) {
    ajax({
        method  : 'POST',
        path    : '/api/todo/add',
        data    : data,
        callback: function (r) {
            callback(r)
        }
    })
}

// 删
var apiTodoDelete = function (id, callback) {
    ajax({
        path    : '/api/todo/delete/' + id,
        callback: function (r) {
            callback(r)
        }
    })
}

var apiTodoUpdate = function (data, callback) {
    ajax({
        method  : 'POST',
        path    : '/api/todo/update/' + data.id,
        data    :data,
        callback: function (r) {
            callback(r)
        }
    })
}

var apiTodoAll = function () {
    ajax({
        path    : '/api/todo/all',
        callback: function (r) {
            var res = r.response
            var todoAll = JSON.parse(res)
            insertTodos(todoAll)
        }
    })
}

var apiLogout = function () {
    ajax({
        method  : 'POST',
        path    : '/api/user/logout',
        callback: function (r) {
            var res = r.response
            log('res', res)
            location.reload()
        }
    })
}