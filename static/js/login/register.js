
var apiUserRegister = function (data, callback) {
    ajax({
        method  : 'POST',
        path    : '/api/user/register',
        data    : data,
        callback: function (r) {
            callback(r)
        }
    })
}

var getRegisterData = function (event) {
    var username = dqs('#id-input-username').value
    var password = dqs('#id-input-password').value
    
    var data = {
        username: username,
        password: password,
    }
    return data
}

bindEvent('#id-button-register', 'click', function (event) {
    var data = getRegisterData()
    log('data', data)
    apiUserRegister(data, function (event) {
        console.log('')
        location.reload()
    })
})

var apiUserLogin = function (data, callback) {
    ajax({
        method  : 'POST',
        path    : '/api/user/login',
        data    : data,
        callback: function (r) {
            callback(r)
        }
    })
}
bindEvent('#id-button-login', 'click', function (event) {
    var data = getRegisterData()
    log('data', data)
    apiUserLogin(data, function (event) {
        console.log('注册成功')
        location.reload()
    })
})