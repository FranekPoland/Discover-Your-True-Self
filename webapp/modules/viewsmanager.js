import {
    createChart
} from "./resultdisplayer.js";
import {
    getType,
    isValid
} from "./analyzer.js";
import {
    initRegister
} from "./login.js";
import {
    storage
} from "./storage.js"
import {
    initSurvey
} from "./questionmaker.js";

import {getAdminResult} from "./adminPanel.js"


var result = document.getElementById('result');
var btn1 = document.querySelector('.button1');
var btnlogout = document.querySelector('.btn-logout');
var adminPanelBtn = document.querySelector('.btn-admin');
// var url = 'http://localhost:5000/'
var url = 'https://rocky-shore-64084.herokuapp.com/'
var isNewUser = true;

var showSurvey = function() {
    initSurvey();
    $('.question-container').show();
    $('.login').hide();
    $('.matrix2').removeClass('matrix2');
    $('body').removeClass('matrix');
    $('.navbar').show(); 
}

var hideLandingPage = function() {
    $('.landing-page').hide();
    $('.matrix').removeClass('matrix');
    $('.navbar').show();
}

var displayLogin = function () {
    $('.start-container').hide();
        $('.btncont').hide();
        $('.matrix').removeClass('matrix').addClass('matrix2');
    $('.login').show();
};

function checkToken() {
    var token = window.localStorage.getItem('token');
    var name = window.localStorage.getItem('name');
    if (token) {
        checkProfile();
        $('.user').html(name);
    } else {  
        $('.login').show();
    }
}

var startApp = function () {
    $('body').addClass('matrix');
    checkToken();
    $('.question-container').hide();
    $('.login').hide(); 
    btn1.addEventListener('click', function () {
        displayLogin();
        initRegister();
    }, false);
}

$('input[type="radio"]').click(function () {
    if ($("input:checked").length === 2) {
        $('.btn-next').show();
    }
});

// getProfile from json (FE)
var getProfile = function () {
    var type = getType();
    storage.result = type;
    var path = './jsons/' + type + '.json';
    fetch(path)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            $('#photo').attr("src", json.img);
            $('#description').text(json.description);
            $('.link').attr("href", json.link);
            if (isNewUser) {
                updateProfile();
            }
        });

}


// checkProfile and display it from backend otherwise show survery
var checkProfile = function () {
    return $.ajax({
        method: "GET",
        url: url + 'profile'
    }).then(function (resp) {
        if (resp){
            storage.answers = resp.answers.split(",");
            storage.result = resp.result;
            $('.matrix').removeClass('.matrix');
            $('.start-container').toggle();
            $('.landing-page').hide();
            isNewUser = false;
            displayProfile();
        } else {
            showSurvey(); 
            hideLandingPage();
        }
    })
}


var displayProfile = function () {
    $('.matrix').removeClass('matrix');
    $('.navbar').show();
    if (!isValid()) {
        return;
    };
    createChart();
    getProfile();
    $('#result').hide();
    $('.chartcontainer').show();
}

var updateProfile = function () {
    $.ajax({
        method: "POST",
        url: url +'profile',
        data: {
            user: window.localStorage.getItem('name'),
            answers: storage.answers.toString(),
            result: storage.result
        }
    })
}

function logout() {
    storage.user = '';
    storage.answers = '';
    storage.result = '';
    window.localStorage.setItem('token', null);
    window.localStorage.setItem('name', null);
    window.location.reload();
}

result.addEventListener('click', displayProfile, false);
btnlogout.addEventListener('click', logout, false);
adminPanelBtn.addEventListener('click', getAdminResult, false);

export {
    startApp,
    checkProfile
}