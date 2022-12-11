document.getElementById("filterbutton").addEventListener("click", function(){
    let x = document.getElementById("filters");
    if (x.style.display === "none") {
        x.style.display = "inline";
    } 
    else {
        x.style.display = "none";
    }

    let y = document.getElementById("filterbuttontext");
    if (y.innerHTML === "Show Filters") {
        y.innerHTML = "Hide Filters";
    } 
    else {
        y.innerHTML = "Show Filters";
    }
}); 

function closeTable(){
    document.getElementById("resultholder").style.display = "none";
}

document.getElementById("searchbarform").addEventListener("submit", function(e){
    e.preventDefault();
    let query = document.getElementById("searchbar").value;
    let sector = document.getElementById("sector-select").options[document.getElementById("sector-select").selectedIndex].value;
    let category = document.getElementById("category-select").options[document.getElementById("category-select").selectedIndex].value;
    let unit = document.getElementById("unit-select").options[document.getElementById("unit-select").selectedIndex].value;

    getEstimates(query, sector, category, unit, 1);
});