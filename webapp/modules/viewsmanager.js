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

var result = document.getElementById('result');
var btn1 = document.querySelector('.button1');
var btnlogout = document.querySelector('.btn-logout');

var url = 'http://localhost:5000/'
// var url = 'https://rocky-shore-64084.herokuapp.com/'
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


// function checkUser() {
//     var token = window.localStorage.getItem('token');
//     if (token) {
//         console.log('igottoken');
//         fetchProfile();
//     } else {
//         $('.login').show();
//     }
// }


function checkToken() {
    var token = window.localStorage.getItem('token');
    if (token) {
        console.log('igottoken');
        checkProfile();
    } else {
        console.log('pokaz logoowanie');    
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
        // initSurvey(); 
        // TODO add init after validation displayLogin
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
                console.log('update');
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
        console.log('resp', resp);
        if (resp){
            storage.answers = resp.answers.split(",");
            storage.result = resp.result;
            $('.matrix').removeClass('.matrix');
            $('.start-container').toggle();
            $('.landing-page').hide();
            isNewUser = false;
            displayProfile(); //true because we have answers from backend
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
        console.log('invalid')
        return;
    };
    console.log(storage, 'dispprof');
    createChart();
    getProfile();
    $('#result').hide();
    $('.chartcontainer').show();
}

var updateProfile = function () {
    console.log(storage);
    $.ajax({
        method: "POST",
        url: url +'profile',
        data: {
            user: storage.user,
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
    window.location.reload();
}

result.addEventListener('click', displayProfile, false);
btnlogout.addEventListener('click', logout, false);

export {
    startApp,
    checkProfile
}