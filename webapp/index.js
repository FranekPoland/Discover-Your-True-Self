var btn1 = document.querySelector('.button1');


btn1.addEventListener('click', function(){
    var matrix = document.querySelector('.matrix');
    // var cont = document.querySelector('.start-container');
    //matrix.classList.remove('matrix');
    // cont.classList.add('hidden');
    $('.start-container').hide();
    $('.btncont').hide();
    $('.matrix').removeClass('matrix')

}, false);


