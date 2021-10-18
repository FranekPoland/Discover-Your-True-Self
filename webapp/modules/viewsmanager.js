import {createChart} from "./resultdisplayer.js";

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

var displayProfile = function () {
    createChart();
    $('#result').hide();
    $('.chartcontainer').show();
}

result.addEventListener('click', displayProfile, false);

export {
    startApp
}