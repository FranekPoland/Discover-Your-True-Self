// TODO save name and password in local storage after clicking on login, eye should work

var url = 'https://rocky-shore-64084.herokuapp.com/'
var user = {}


var initRegister = function () {
    $('.log').on('click', toggleLogin);
    $('.register').on('click', toggleLogin);
    $('.btn-register').on('click', register);
    $('.btn-login').on('click', login);
}

var toggleLogin = function () {
    $('.log').toggle();
    $('.btn-register').toggle();
    $('.btn-login').toggle();
    $('.register').toggle();
}


function register() {
    
    var name = $('#username').val();
    var password = $('#password').val();
    console.log(name, password);
    // $('.login-link').show();
    // $('.register').hide();
    // $('.btn-register').hide();
    // $('.btn-login').show();
    url = url + 'register?&name=' + name + '&password=' + password;
    console.log('to jest url', url);
    $.ajax({
        method: "POST",
        url: url,
        // data: JSON.stringify({ 'password': password }),
        dataType: "json"
      }).done(function(resp) {
          console.log(resp)
        });
    $('.notification').show();
}

function login() {
    var name = $('#username').val();
    var password = $('#password').val();
    $('.notification').hide();
    var users;
    $.ajax({
        method: "POST",
        url: url + 'login?name=' + name + '&password=' + password
    }).then(function( resp ) {
        console.log(resp);
        users = resp;
        var isAuth = auth(users, name, password);
        console.log('isAuth', isAuth)
    }).fail(function(err) {
        console.log('err', err)
    });
    
}

function auth(res) {
    console.log(users);
    return users[name] ? users[name].password === password : false;
}











export {
    initRegister,
}