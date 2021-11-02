import {createChart} from "./resultdisplayer.js";
import {getType, isValid} from "./analyzer.js";
import {initRegister} from "./login.js";
import {storage} from "./storage.js"
import { initSurvey } from "./questionmaker.js";

var result = document.getElementById('result');
var btn1 = document.querySelector('.button1');

var url = 'http://localhost:5000/'
// var url = 'https://rocky-shore-64084.herokuapp.com/'


function checkUser() {
    var token = window.localStorage.getItem('token');
    if (token) {
        console.log('igottoken');
        if (fetchProfile()) {
            console.log('igotresult')
            displayProfile();
            $('.matrix').removeClass();
            console.log('pokazprofil');
        } else {
           initSurvey();
        }
    } else { 
        $('.login').show();
    }
}



var startApp = function () {
    checkUser();
    $('.question-container').hide();
    $('.login').hide();
    btn1.addEventListener('click', function () {
        $('.start-container').hide();
        $('.btncont').hide();
        $('.matrix').removeClass('matrix').addClass('matrix2');
        displayLogin();
        initRegister();
        // initSurvey(); 
        // TODO add init after validation displayLogin
    }, false);
}

var displayLogin = function(){
    $('.login').show();
};

$('input[type="radio"]').click(function () {
    if ($("input:checked").length === 2) {
        $('.btn-next').show();
    }
});

var getProfile = function() {
    var type = getType();
    storage.result = type;
    var path = './jsons/'+type + '.json';
    fetch(path)
        .then( function(response) {
            return response.json();
        })
        .then(function(json) {
            $('#photo').attr("src", json.img);
            $('#description').text(json.description);
            $('.link').attr("href", json.link);
            updateProfile();
        });

}

var fetchProfile = function() {
    return $.ajax({
        method: "GET",
        url: url + 'profile'
    }).then(function(resp){
        console.log('this is profile', resp);
        storage.answers = resp.answers.split(",");
        storage.result = resp.result;
        if (resp.result) {
        return true;
        } else {
            return false;
        }
    })
}



var displayProfile = function () {
    if (!isValid()) {
        console.log('invalid')
        return;
    };
    createChart();
    getProfile();
    $('#result').hide();
    $('.chartcontainer').show();
    
}

var updateProfile = function() {
    $.ajax({
        method: "POST",
        url: url + 'profile', 
        data: {
            user: storage.user,
            answers: storage.answers.toString(),
            result: storage.result
        }
    })
}


result.addEventListener('click', displayProfile, false);

export {
    startApp
}