// import json from '../questions.json';

import {saveAnswer} from './analyzer.js';

import json from "../questions.json" assert {
    type: 'json'
};

var radios = document.querySelectorAll('input[type="radio"]');

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


var arrOfElems = findQ1HtmlElems();

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

var arrOfElems2 = findQ2HtmlElems();


var fillHtmlElems = function (element, string) {
    element.innerText = string
}

var applyQuestion1Object = function () {
    var arr = findQ1HtmlElems();
    getString(json[counter], arr);
}

var applyQuestion2Object = function () {
    var arr = findQ2HtmlElems();
    counter++;
    getString(json[counter], arr);
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
        var  j;
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
    $('input[type="radio"]').each(function(){
        $(this).prop('checked', false);  
    });
 } 

var btnNext = document.querySelector('.btn-next');
    btnNext.addEventListener('click', function (event) { 
        saveAnswer();
        counter++;
    applyQuestion1Object();
    applyQuestion2Object();
    clearInput();
}, false);



var initSurvey =function() {
    console.log('init');
    applyQuestion1Object();
    applyQuestion2Object();
}

export {
    initSurvey
};