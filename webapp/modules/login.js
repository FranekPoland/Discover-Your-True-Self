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
    // $('.login-link').show();
    $('.register').hide();
    $('.btn-register').hide();
    $('.btn-login').show();
    $.ajax({
        method: "PUT",
        url: 'https://discover-self-default-rtdb.europe-west1.firebasedatabase.app/users/' + name + '.json',
        data: JSON.stringify({ 'password': password }),
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
        method: "GET",
        url: "https://discover-self-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    }).then(function( resp ) {
        users = resp;
        var isAuth = auth(users, name, password);
        console.log('isAuth', isAuth)
    }).fail(function(err) {
        console.log('err', err)
    });
    
}

function auth(users, name, password) {
    return users[name] ? users[name].password === password : false;
}











export {
    initLogin
}