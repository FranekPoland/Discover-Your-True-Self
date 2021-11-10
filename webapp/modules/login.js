// TODO save name and password in local storage after clicking on login, eye should work

import { storage } from "./storage.js";
import {checkProfile} from "./viewsmanager.js";

var url = 'http://localhost:5000/';
// var url = 'https://rocky-shore-64084.herokuapp.com/'

$('#username').on('click', hideFeedBack);
$('#password').on('click', hideFeedBack);


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

function hideFeedBack() {
    $('.notification').text('');
    $('.notification').hide();
}

function showFeedBack(msg) {
    $('.notification').show().text(msg);
}

function isValid() {
    var name = $('#username').val();
    var password = $('#password').val();
    if (name.length < 3 || password.length < 6) {
        showFeedBack('Login musi mieć co najmniej 3 znaki a password co najmniej 6 znaków');
        return false
    }
    return true
}


function register() {
    var name = $('#username').val();
    var password = $('#password').val();
    if (!isValid() ) {
        return;
    } 
        $.ajax({
            method: "POST",
            url: url + 'register?&name=' + name + '&password=' + password,
            dataType: "json"
        }).done(function(resp) {
            console.log(resp);
            showFeedBack(resp);
        });
        showFeedBack('Twoje konto zostało pomyślnie utworzone, możesz się teraz zalogować');
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
            $('.login').hide();
            $('.matrix2').removeClass('matrix2');
            $('.navbar').show();
            $('.user').html(name);
            checkProfile();
        }
    }).fail(function(err) {
        showFeedBack('Błędny login lub hasło');
    });
}

export {
    initRegister,
}








//Walidacja errorow

//Login musi mieć co najmniej 3 znaki a password co najmniej 6 znaków
//Twoje konto zostało utworzone, zaloguj się