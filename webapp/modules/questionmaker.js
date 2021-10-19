// import json from '../questions.json';

import { storage } from "./storage.js";

import allQuestions from "../jsons/questions.json" assert {
    type: 'json'
};

import lastQuestion from "../jsons/lastquestion.json" assert {
    type: 'json'
};

var btnNext = document.querySelector('.btn-next');
var btnBack = document.querySelector('.btn-back');


btnNext.addEventListener('click', function (event) {
    saveAnswer();
    counter++;
    applyQuestion1Object();
    applyQuestion2Object();
    clearInput();
    $('.btn-back').show();
    if (storage.answers.length >= allQuestions.length) {
        $('#result').show();
        $('.btn-back').hide();
        $('.question-cointaner').hide();
    }
}, false);

btnBack.addEventListener('click', function (event) {
    counter = counter -3;
    applyQuestion1Object();
    applyQuestion2Object();
    var value1 = storage.answers.pop();
    var value2 = storage.answers.pop();
    fillInputs(value1, value2);
    $('.btn-next').show();
}, false);



var counter = 0;
var findQ1HtmlElems = function () {
    var arrOfElems = [];
    var q = document.getElementById('q1');
    var a1 = document.getElementById('a1');
    var a2 = document.getElementById('a2');
    var a3 = document.getElementById('a3');
    var i1 = document.getElementById('i1');
    var i2 = document.getElementById('i2');
    var i3 = document.getElementById('i3');
    arrOfElems.push(q, a1, a2, a3, i1, i2, i3);
    return arrOfElems;
}



var findQ2HtmlElems = function () {
    var arrOfElems = [];
    var question2 = document.getElementById('q2');
    var a4 = document.getElementById('a4');
    var a5 = document.getElementById('a5');
    var a6 = document.getElementById('a6');
    var i1 = document.getElementById('i4');
    var i2 = document.getElementById('i5');
    var i3 = document.getElementById('i6');
    arrOfElems.push(question2, a4, a5, a6, i1, i2, i3);
    return arrOfElems;
}



var fillHtmlElems = function (element, string) {
    element.innerText = string
}

var applyQuestion1Object = function () {
    var arr = findQ1HtmlElems();
    getString(allQuestions[counter], arr);
}

var applyQuestion2Object = function () {
    var arr = findQ2HtmlElems();
    counter++;
    getString(allQuestions[counter], arr);
}



var addLastQuestion = function (str1,str2) {
    console.log('addquestion');
    $('#q1').text(lastQuestion.q);
    $('#a1').text(lastQuestion[str1]);
    $('#a2').text(lastQuestion[str2]);
    $('.question-cointaner').show();
    $('.btn-next').show();
    $('#result').hide();
    $('#a3').hide();
    $('#i3').hide();
    $('.second-cointainer').hide();
    console.log(lastQuestion);
    addInputValue("i1", str1);
    addInputValue("i2", str2);
}

var addInputValue = function (element, key) {
    $(element).val(key);
}


var getString = function (object, arrOfElems) {
    var str;
    var i = 0;
    for (var key in object) {
        str = object[key];
        var element = arrOfElems[i];
        var j;
        if (i !== 0) {
            j = i + 3;
        }
        var input = arrOfElems[j]
        fillHtmlElems(element, str);
        i++;
        addInputValue(input, key);
    }

}


var clearInput = function () {
    $('input[type="radio"]').each(function () {
        $(this).prop('checked', false);
    });
    $('.btn-next').hide();
}



var fillInputs = function(value1, value2) {
    $('input[value='+value1+']').prop('checked', true);
    $('input[value='+value2+']').prop('checked', true);
}


var initSurvey = function () {
    applyQuestion1Object();
    applyQuestion2Object();
}

var saveAnswer = function () {
    var inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(function (input) {
        if (input.checked) {
            storage.answers.push(input.value);
        }
    });
}



export {
    addLastQuestion,
    initSurvey, 
    saveAnswer,
    clearInput,
    fillInputs
};