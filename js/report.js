var report;
function updateCanvas(){
    if (report){
        report.destroy(0);
    }

    emissions = JSON.parse(localStorage.getItem("emissions"));
    if (emissions === null)
    {
        alert("Use search to find emission data");
        document.getElementById("myreport").style.display = "none";
        return;
    }
    document.getElementById("myreport").style.display = "block";
    document.getElementById("suggestions").style.display = "none";

    var co2 = 0;
    var ch4 = 0;
    var n2o = 0;
    var other = 0;
    var total = 0;
    for (var i=0; i<emissions.length;i++){
        co2 += parseFloat(emissions[i].co2);
        ch4 += parseFloat(emissions[i].ch4);
        n2o += parseFloat(emissions[i].n2o);
        other += parseFloat(emissions[i].other);
        total += parseFloat(emissions[i].total);
    }
    document.getElementById("totalhere").innerHTML = "<b>"+total.toFixed(2)+" kg</b>"

    var ctx = document.getElementById('personalChart').getContext('2d');
    Chart.defaults.color = "#c8c8c8";
    report = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Co2', 'CH4', 'N2O', "Other"],
        datasets: [{
            label: 'Available Breakdown (Partly)',
            data: [co2,ch4,n2o,other],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(245, 66, 230, 0.2)'
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(245, 66, 230, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
        },
        options:{
            responsive:true,
            maintainAspectRatio: true
        }
    });
}

updateCanvas();