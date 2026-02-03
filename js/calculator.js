/*
    ALL FUNCTIONS RELATED TO RENDERING THE CALCULATOR POPUP
*/

var chart;
function addRecord(part){
    // ADDS CALCULATED EMISSION DATA TO LOCALSTORAGE
    var emissions = [];
    if(localStorage.getItem("emissions") === null){
        localStorage.setItem("emissions", JSON.stringify(emissions));
    }
    emissions = JSON.parse(localStorage.getItem("emissions"));
    var rec = {
        "co2":document.getElementById("popupaddbtn").getAttribute("co2")/part,
        "ch4":document.getElementById("popupaddbtn").getAttribute("ch4")/part,
        "n2o":document.getElementById("popupaddbtn").getAttribute("n2o")/part,
        "other":document.getElementById("popupaddbtn").getAttribute("other")/part,
        "total":document.getElementById("popupaddbtn").getAttribute("total")/part,
        "unit":document.getElementById("popupaddbtn").getAttribute("unit")
    }
    emissions.push(rec);
    localStorage.setItem("emissions", JSON.stringify(emissions));

    hidePopup();
    updateCanvas();
}

function insertResult(data){
    // INSERTS DATA AFTER CALCULATE RETURNS A VALUE
    document.getElementById('popupChart').style.display = "block";
    if (chart){
        chart.destroy(0);
    }
    console.log(data);
    document.getElementById("popupresults").style.display = "block";
    document.getElementById("popupemissions").innerHTML = data.co2e.toFixed(2)+" "+data.co2e_unit;
    var ctx = document.getElementById('popupChart').getContext('2d');

    var co2 = (data.constituent_gases.co2 != null) ? data.constituent_gases.co2 : 0;
    var ch4 = (data.constituent_gases.ch4 != null) ? data.constituent_gases.ch4 : 0;
    var n2o = (data.constituent_gases.n20 != null) ? data.constituent_gases.n20 : 0;
    var other = (data.constituent_gases.co2e_other != null) ? data.constituent_gases.co2e_other : 0;

    document.getElementById("popupaddbtn").setAttribute("co2",co2);
    document.getElementById("popupaddbtn").setAttribute("ch4",ch4);
    document.getElementById("popupaddbtn").setAttribute("n2o",n2o);
    document.getElementById("popupaddbtn").setAttribute("other",other);
    document.getElementById("popupaddbtn").setAttribute("total",data.co2e);
    document.getElementById("popupaddbtn").setAttribute("unit",data.co2e_unit);

    var insertData = [co2,ch4,n2o,other];
    var flag = false;
    for (var i=0; i<insertData.length; i++){
        if (insertData[i] > 0){
            flag = true;
        }
    }
    if (!flag){
        document.getElementById('popupChart').style.display = "none";
        return;
    }
    

    Chart.defaults.color = "#c8c8c8";
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
        labels: ['Co2', 'CH4', 'N2O', "Other"],
        datasets: [{
            label: 'Constituent Gases',
            data: insertData,
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

function showPopup() {
    // DISPLAYS POPUP
    var popup = document.getElementById("popup");
    var backdrop = document.getElementById("backdrop");
    document.getElementById("popupinput").value = "";

    popup.style.display = "block";
    backdrop.style.display = "block";
  
    document.body.style.overflow = "hidden";
  }
  
  function hidePopup() {
    // HIDES POPUP
    if (chart){
        chart.destroy(0);
    }
    document.getElementById('popupChart').style.display = "block";
    document.getElementById("popupresults").style.display = "none";

    var popup = document.getElementById("popup");
    var backdrop = document.getElementById("backdrop");

    popup.style.display = "none";
    backdrop.style.display = "none";
  
    document.body.style.overflow = "auto";
  }

function openCalculator(data){
    // INSERTS DATA WHICH WAS RECEIVED BY API WHILE RENDERING TABLE INTO THE POPUP
    document.getElementById("popuptitle").innerHTML = data.name;
    document.getElementById("popupdesc").innerHTML = data.description;
    document.getElementById("popupunit").innerHTML = data.unit.replace("kg/","");
    document.getElementById("popupbtn").setAttribute("uuid",data.activity_id);
    document.getElementById("popupbtn").setAttribute("unittype",data.unit_type);
    showPopup();
    return;
}

// PART ADD OF POPUP
document.getElementById("popuppartadd").addEventListener("submit", function(e){
    e.preventDefault();
    var part = document.getElementById("popuppart").value;

    addRecord(parseInt(part));
});

// CALCULATE BUTTON
document.getElementById("popupform").addEventListener("submit", function (e) {
    e.preventDefault();
    const inpRaw = document.getElementById("popupinput").value.trim();
    const inp = parseFloat(inpRaw);
    if (Number.isNaN(inp)) {
        return;
    }

    const uuid = document.getElementById("popupbtn").getAttribute("uuid");
    const unitType = document.getElementById("popupbtn").getAttribute("unittype").toLowerCase();
    let unit = document.getElementById("popupunit").innerHTML.toLowerCase();
    document.getElementById("popupinput").value = "";

    if (unitType === "energy" && unit === "kwh") {
        unit = "kWh";
    }
    if (unitType === "data") {
        unit = unit.toUpperCase();
    }

    fetch("https://carbonemissionsapi.firasadil.com/getkey", { method: "GET" })
        .then(response => response.json())
        .then(data => {
            return fetch(ROOT + "/estimate", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + data.key,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emission_factor: {
                        data_version: "30",
                        activity_id: uuid
                    },
                    parameters: {
                        [unitType]: inp,
                        [`${unitType}_unit`]: unit
                    }
                })
            });
        })
        .then(response => response.json())
        .then(data => {
            insertResult(data);
        })
        .catch(error => {
            console.log(error);
        });
});


