import {initSurvey} from "./modules/questionmaker.js";
import { createChart } from "./modules/resultdisplayer.js";
var btn1 = document.querySelector('.button1');

$('input[type="radio"]').click(function(){
    console.log($('input:checked'));
    if ($( "input:checked").length === 2) {
        $('.btn-next').show();

    }
});

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
