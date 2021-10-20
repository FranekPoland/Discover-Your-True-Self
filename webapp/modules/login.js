// TODO save name and password in local storage after clicking on login, eye should work

var initLogin = function () {
    $('.btn-login').on('click', login);
    $('.register').on('click', initRegister);
    $('.btn-register').on('click', register);
    $('.btn-register').hide();
}
var initRegister = function () {
    $('.btn-register').show();
    $('.btn-login').hide();
}

function register() {
    
    var name = $('#username').val();
    var password = $('#password').val();
    console.log(name,password);
    localStorage.setItem('name', name);
    localStorage.setItem('password', password);
    $('.login-link').show();
    $('.register').hide();
}

function login() {
    var name = $('#username').val();
    var password = $('#password').val();
    var storageName = localStorage.getItem('name');
    var storagePass = localStorage.getItem('password');
    if (storageName === name && storagePass === password) {

        console.log('valid username');
        console.log('valid password');
    } else {
        console.log('invalid data')
    }
}












export {
    initLogin
}