import {startApp} from "./modules/viewsmanager.js";

window.addEventListener('DOMContentLoaded', (event) => {
    init();
});

var globalReqHandler = function () {
    $.ajaxSetup({
        beforeSend: function(xhr) {
            console.log('i add token')
            var token = window.localStorage.getItem('token');
            xhr.setRequestHeader('token', token);
        }
    });
}

var init = function () {
    globalReqHandler();
    startApp();
    console.log('uruchomienie');
}


