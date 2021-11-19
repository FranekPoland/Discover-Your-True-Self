function getAdminResult() {
    // var url = 'http://localhost:5000/';
    var url = 'https://rocky-shore-64084.herokuapp.com/'
     $.ajax({
        method: 'GET',
        url: url + 'allusers'
    }).then(function (resp) {
        console.log('users', resp)
        var arr = readResult(resp)
        displayChart(arr);
    }).fail(function (err) {
        console.log('err', err)
        $('.admin-info').text('You are not allowed!')
    });
}

function readResult(resp) {
    var c = 0, b = 0, r = 0;
    for (var i in resp) {
        var type = resp[i].profile ? resp[i].profile.result : undefined;
        if (type === undefined) continue;
        type === 'redpill' ? r++ : type === 'blackpill' ? b++ : c++;
    }
    console.log(c, b, r)
    return [c, b, r];
}

var displayChart = function (data) {
    var ctx = document.getElementById('admin-panel').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cuckold', 'Blackpill', 'Redpill'],
            datasets: [{
                label: 'Users',
                data: data,
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
    getAdminResult
}