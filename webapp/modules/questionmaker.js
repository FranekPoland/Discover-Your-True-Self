// import json from '../questions.json';

import json from "../questions.json" assert {
    type: 'json'
};


var findQ1HtmlElems = function () {
    var arrOfElems = [];
    var q = document.getElementById('q1');
    var a1 = document.getElementById('a1');
    var a2 = document.getElementById('a2');
    var a3 = document.getElementById('a3');
    arrOfElems.push(q, a1, a2, a3);
    return arrOfElems;
    
}


var arrOfElems = findQ1HtmlElems();

var findQ2HtmlElems = function () {
    var arrOfElems = [];
    var question2 = document.getElementById('q2');
    var a4 = document.getElementById('a4');
    var a5 = document.getElementById('a5');
    var a6 = document.getElementById('a6');
    arrOfElems.push(question2, a4, a5, a6);
    return arrOfElems;
}

var arrOfElems2 = findQ2HtmlElems();


var fillHtmlElems = function (element, string) {
    element.innerText = string
}

var getQuestionObject = function (arr) {
    for (var key in json) {
        getString(json[key], arr)
    }
}

var getString = function (object, arrOfElems) {
    var str;
    var i = 0;
    for (var key in object) {
        str = object[key];
        var element = arrOfElems[i]
        fillHtmlElems(element, str);
        i++;
    }

}

getQuestionObject(arrOfElems);
getQuestionObject(arrOfElems2);

export default {
    getQuestionObject
};