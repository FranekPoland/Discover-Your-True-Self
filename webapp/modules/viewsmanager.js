import {createChart} from "./resultdisplayer.js";
import {getType, isValid} from "./analyzer.js";
import {initSurvey} from './questionmaker.js';

var result = document.getElementById('result');
var btn1 = document.querySelector('.button1');

var startApp = function () {
    $('.question-cointaner').hide();
    btn1.addEventListener('click', function () {
        var matrix = document.querySelector('.matrix');
        $('.start-container').hide();
        $('.btncont').hide();
        $('.matrix').removeClass('matrix');
        $('.question-cointaner').show();
        initSurvey();
    }, false);
}

$('input[type="radio"]').click(function () {
    if ($("input:checked").length === 2) {
        $('.btn-next').show();
    }
});

var getProfile = function() {
    var type = getType();
    var path = './jsons/'+type + '.json';
    fetch(path)
        .then( function(response) {
            return response.json();
        })
        .then(function(json) {
            $('#photo').attr("src", json.img);
            $('#description').text(json.description);
            $('.link').attr("href", json.link);
            console.log(json, type);

        });

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

result.addEventListener('click', displayProfile, false);

export {
    startApp
}