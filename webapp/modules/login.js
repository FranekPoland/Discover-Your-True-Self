// TODO save name and password in local storage after clicking on login, eye should work

import { initSurvey } from "./questionmaker.js";
import { storage } from "./storage.js";

var url = 'http://localhost:5000/'
// var url = 'https://rocky-shore-64084.herokuapp.com/'
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
    url = url + 'register?&name=' + name + '&password=' + password;
    console.log('to jest url', url);
    $.ajax({
        method: "POST",
        url: url,
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
    $.ajax({
        method: "POST",
        url: url + 'login?name=' + name + '&password=' + password
    }).then(function(resp, x, xhr ) {
        if (resp.token) {
            var token = resp.token;
            console.log(xhr, token);
            window.localStorage.setItem('token', token);
            storage.user = name;
            $('.login').hide();
            $('.question-container').show();
            $('.matrix2').removeClass('matrix2'); 
            initSurvey();
        }
    }).fail(function(err) {
        console.log('err', err)
    });
    
}



export {
    initRegister,
}