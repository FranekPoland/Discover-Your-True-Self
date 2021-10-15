import {initSurvey} from "./modules/questionmaker.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrDjR-yRu6sn-ZHjr6crxfjWJDYEbwkho",
  authDomain: "discover-self.firebaseapp.com",
  projectId: "discover-self",
  storageBucket: "discover-self.appspot.com",
  messagingSenderId: "307774480969",
  appId: "1:307774480969:web:578558600b2910fd47d598",
  measurementId: "G-2FD6SMGHR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


var btn1 = document.querySelector('.button1');

$('input[type="radio"]').click(function(){
    console.log($('input:checked'));
    if ($( "input:checked").length === 2) {
        $('.btn-next').show();

    }
});

var init = function() {
    $('.question-cointaner').hide();
}
btn1.addEventListener('click', function(){
    var matrix = document.querySelector('.matrix');
    $('.start-container').hide();
    $('.btncont').hide();
    $('.matrix').removeClass('matrix');
    $('.question-cointaner').show();
    initSurvey();
}, false);

init();
