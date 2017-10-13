//bindEvent('#id-button-add', 'click', function (event) {
//    addTodo()
//})
//
//bindEvent('.todo-list', 'click', function (event) {
//    deleteTodo(event)
//})
//
//bindEvent('.todo-list', 'click', function (event) {
//    editTodo(event)
//})
//
//// 更新
//bindEvent('.todo-list', 'keydown', function (event) {
//    updateTodo(event)
//})

let bindAllEvents = function () {
    let clickEvents = {
        '#id-button-add'   : addTodo,
        '.todo-list'       : todoListEvent,
        '#id-button-logout': logoutEvent,
    }

    let keydownEvents = {
        '.todo-list': updateTodo,
    }
    
    let allEvents = {
        click  : clickEvents,
        keydown: keydownEvents,
    }
    
    var allEventKeys = Object.keys(allEvents)

    for (var j = 0; j < allEventKeys.length; j++) {
        let eventName = allEventKeys[j]
        let singleEvents = allEvents[eventName]
        let keys = Object.keys(singleEvents)
        for (var i = 0; i < keys.length; i++) {
            let sel = keys[i]
            bindEvent(sel, eventName, function (event) {
                singleEvents[sel](event)
            })
        }
    }
}
