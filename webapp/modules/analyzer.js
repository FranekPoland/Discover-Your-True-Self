import {
    storage
} from "./storage.js";

import {addLastQuestion} from "./questionmaker.js";

import allQuestions from "../jsons/questions.json" assert {
    type: 'json'
};



var getType = function () {
    var resultArr = getResult();
    var c, b, r;
    resultArr.forEach(function(result, i) {
        if (i === 0) {
            c = result;
        }
        if (i === 1) {
            b = result;
        }
        if (i === 2) {
            r = result;
        }
    });

    var type = '';

    if (b > c) {
        if (b > r) {
            type = 'blackpill';
        }else {
            type ='redpill';
        }
    } else {
        if (c > r) {
            type = 'cuckold';
        } else {
            type = 'redpill';
        }

    }
    return type;

}


var getResult = function () {
    var c = 0;
    var b = 0;
    var r = 0;

    storage.answers.forEach(function (ans) {
        if (ans === 'c') {
            c++;
        }
        if (ans === 'b') {
            b++;
        }
        if (ans === 'r') {
            r++;
        }
    });
    return [c,b,r]
};


function isValid() {
    var result = getResult();
    var c = result[0];
    var b = result[1];
    var r = result[2];
    if (c+b+r >= allQuestions.length) {
        if (c===b && c > r) {
            addLastQuestion("c","b");
            return false
        }
        if (c===r && c > b) {
            addLastQuestion("c","r");
            return false
        }
        if (r===b && r > c) {
            addLastQuestion("r","b");
            return false
        }
        
    }
    return true;
}





export {
    getResult,
    getType,
    isValid
}