import {
    storage
} from "./storage.js";

var getType = function (c, b, r) {
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
    var type = getType(c, b, r);
    return [c,b,r]
    // var result = 'Gratuluje jesteś zwycięzcą: ' + type;
    // $('#my-result').text(result).show();
};


export {
    getResult
}