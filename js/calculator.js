function showPopup() {
    var popup = document.getElementById("popup");
    var backdrop = document.getElementById("backdrop");

    popup.style.display = "block";
    backdrop.style.display = "block";
  
    document.body.style.overflow = "hidden";
  }
  
  function hidePopup() {
    var popup = document.getElementById("popup");
    var backdrop = document.getElementById("backdrop");

    popup.style.display = "none";
    backdrop.style.display = "none";
  
    document.body.style.overflow = "auto";
  }

function openCalculator(data){
    document.getElementById("popuptitle").innerHTML = data.name;
    document.getElementById("popupdesc").innerHTML = data.description;
    document.getElementById("popupunit").innerHTML = data.unit.replace("kg/","");
    document.getElementById("popupbtn").setAttribute("uuid",data.uuid);
    document.getElementById("popupbtn").setAttribute("unittype",data.unit_type[0]);
    showPopup();
    return;
}

document.getElementById("popupform").addEventListener("submit", function(e){
    e.preventDefault();
    let inp = document.getElementById("popupinput").value;
    let uuid = document.getElementById("popupbtn").getAttribute("uuid");
    let unit_type = document.getElementById("popupbtn").getAttribute("unittype").toLowerCase();
    let unit = document.getElementById("popupunit").innerHTML;
    fetch("https://carbonemissiontracker.pythonanywhere.com/getkey", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        fetch(ROOT+"/estimate", {
        method: 'POST',
        body: '{"emission_factor": {"uuid": "'+uuid+'"}, "parameters": {"'+unit_type+'": '+inp+', "'+unit_type+'_unit": "'+unit+'"}}',
        headers:{
            'Authorization': 'Bearer '+data.key
        },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch(error => {
        console.log(error);
    });
});


