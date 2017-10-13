
var templateTodo = todo => {
    var task = todo.task
    var id = todo.id
    var t = `
        <div class='todo-cell' data-id='${id}'>
            <button class='todo-edit'>编辑</button>
            <button class='todo-delete'>删除</button>
            <span class='todo-task'>${task}</span>
        </div>
    `
    return t
}

var insertTodos = todos => {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo)
    }
}

var loadTodos = function () {
    apiTodoAll()
}
// 增
var insertTodo = function (todo) {
    var html = templateTodo(todo)
    appendHtml('.todo-list', html)
}

var addTodo = () => {
    var addInput = dqs('#id-input-task')
    var todo = {
        id: Date.now(),
        task: addInput.value,
    }
    apiTodoAdd(todo, function (r) {
        var todo = JSON.parse(r.response)
        insertTodo(todo)
    })
}

var deleteTodo = function (event) {
    var target = event.target
    var con = target.classList.contains('todo-delete')
    if (con) {
        var par = target.parentElement
        var todoId = par.dataset.id
        apiTodoDelete(todoId, function () {
            par.remove()
        })
    }
}

var editTodo = function (event) {
    var target = event.target
    var con = target.classList.contains('todo-edit')
    if (con) {
        var todoCell = target.closest('.todo-cell')
        var task = todoCell.querySelector('.todo-task')
        task.contentEditable = true
        task.focus()
    }
}

var updateTodo = function (event) {
    var target = event.target
    if (target.classList.contains('todo-task')) {
        if (event.key == 'Enter') {
            // 取消事件的默认行为, 回车键在编辑标签内容的时候会默认断行
            event.preventDefault()
            // 取消 editable 状态, 发送 update 的请求
            target.contentEditable = false
            var todoCell = target.closest('.todo-cell')
            var todoId = todoCell.dataset.id
            var data = {
                id: todoId,
                'task': target.innerHTML,
            }
            apiTodoUpdate(data, function (r) {
                res = JSON.parse(r.response)
                target.innerHTML = res
            })
        }
    }
}

var todoListEvent = function (event) {
    deleteTodo(event)
    editTodo(event)
}

var logoutEvent = function (event) {
    apiLogout()
}
