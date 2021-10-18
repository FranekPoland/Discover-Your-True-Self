import {
    storage
} from "./storage.js";

import {createChart} from "./resultdisplayer.js";

var result = document.getElementById('result');

var saveAnswer = function () {
    var inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(function (input) {
        if (input.checked) {
            storage.answers.push(input.value);
        }
    });

    console.log(storage);
}

var getHighestScore = function (c, b, r) {
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
    console.log(c,b,r);
    var type = getHighestScore(c, b, r);
    console.log('c', c, 'b', b, 'r', r, type);
    return [c,b,r]
    // var result = 'Gratuluje jesteś zwycięzcą: ' + type;
    // $('#my-result').text(result).show();
}

var displayProfile = function() {
    createChart();
    $('#result').hide();
    $('.chartcontainer').show();
}

result.addEventListener('click', displayProfile, false);


export {
    saveAnswer,
    getResult
}