import {startApp} from "./modules/viewsmanager.js";

window.addEventListener('DOMContentLoaded', (event) => {
    init();
});

var globalReqHandler = function () {
    $.ajaxSetup({
        beforeSend: function(xhr) {
            var token = window.localStorage.getItem('token');
            if (token) {
            xhr.setRequestHeader('token', token);
            }
        }
    });
}

var init = function () {
    globalReqHandler();
    startApp();
    console.log('uruchomienie');
}


