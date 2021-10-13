import { storage } from "./storage.js";

var saveAnswer = function() {
    var inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(function(input) {
        if (input.checked) { 
            console.log('odp', input.value);
            storage.answers.push(input.value);
        }
        
    });

   

}

export {
    saveAnswer
}