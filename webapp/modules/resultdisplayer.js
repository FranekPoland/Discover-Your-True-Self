// import Chart from 'chart.js';
import { getResult } from "./analyzer.js";

var createChart = function () {

    var ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cuckold', 'Blackpill', 'Redpill'],
            datasets: [{
                label: 'Składowe osobowości',
                data: getResult(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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