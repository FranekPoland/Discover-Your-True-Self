import {createChart} from "./resultdisplayer.js";
import {getType, isValid} from "./analyzer.js";
import {initRegister} from "./login.js";

var result = document.getElementById('result');
var btn1 = document.querySelector('.button1');

var startApp = function () {
    $('.question-container').hide();
    $('.login').hide();
    btn1.addEventListener('click', function () {
        var matrix = document.querySelector('.matrix'); // <-- do refactoryzacji?wywalenia
        $('.start-container').hide();
        $('.btncont').hide();
        $('.matrix').removeClass('matrix').addClass('matrix2');
        $('.test').hide();
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
    var path = './jsons/'+type + '.json';
    fetch(path)
        .then( function(response) {
            return response.json();
        })
        .then(function(json) {
            $('#photo').attr("src", json.img);
            $('#description').text(json.description);
            $('.link').attr("href", json.link);
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