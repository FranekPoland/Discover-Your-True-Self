import Chart from 'chart.js';
import { getResult } from "./analyzer.js";

function getAdminResult() {
    var url = 'http://localhost:5000/';
// var url = 'https://rocky-shore-64084.herokuapp.com/'
    return $.ajax({
        method: 'GET',
        url: url +'allusers'
    }).then(function(resp) {
        console.log(resp)
        return resp;
    });
}

var createChart = function () {
    var ctx = document.getElementById('adminPanel').getContext('2d');
     new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cuckold', 'Blackpill', 'Redpill'],
            datasets: [{
                label: 'Udział procentowy profili osobowości użytkowników',
                data: getAdminResult(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

export {
    createChart
}