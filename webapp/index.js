import {initSurvey} from "./modules/questionmaker.js";

var btn1 = document.querySelector('.button1');


var init = function() {
    $('.question-cointaner').hide();
}
btn1.addEventListener('click', function(){
    var matrix = document.querySelector('.matrix');
    $('.start-container').hide();
    $('.btncont').hide();
    $('.matrix').removeClass('matrix');
    $('.question-cointaner').show();
    initSurvey();
}, false);

init();
