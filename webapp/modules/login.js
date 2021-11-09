// TODO save name and password in local storage after clicking on login, eye should work

import { storage } from "./storage.js";
import {checkProfile} from "./viewsmanager.js";

var url = 'http://localhost:5000/';
// var url = 'https://rocky-shore-64084.herokuapp.com/'

var initRegister = function () {
    console.log('init register');
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
    $.ajax({
        method: "POST",
        url: url + 'register?&name=' + name + '&password=' + password,
        dataType: "json"
      }).done(function(resp) {
          console.log(resp)
        });
    $('.notification').show(); // fix (by adding new) display notification if error occurs
}

function login() {
    var name = $('#username').val();
    var password = $('#password').val();
    $('.notification').hide();
    $.ajax({
        method: "POST",
        url: url + 'login?name=' + name + '&password=' + password
    }).then(function(resp) {
        if (resp.token) {
            var token = resp.token;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('name', name);
            // storage.user = name;
            console.log(name);
            $('.login').hide();
            $('.matrix2').removeClass('matrix2');
            $('.navbar').show();
            $('.user').html(name);
            checkProfile();
        }
    }).fail(function(err) {
        console.log('err', err)
    });
}

export {
    initRegister,
}