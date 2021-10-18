import {
    storage
} from "./storage.js";

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
    // var result = 'Gratuluje jesteś zwycięzcą: ' + type;
    // $('#my-result').text(result).show();
};



export {
    getResult,
    getType
}