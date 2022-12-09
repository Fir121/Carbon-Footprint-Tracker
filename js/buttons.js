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

document.getElementById("searchbarform").addEventListener("submit", function(e){
    e.preventDefault();
    let query = document.getElementById("searchbar").value;
    let sector = document.getElementById("sector-select").options[document.getElementById("sector-select").selectedIndex].value;
    let category = document.getElementById("category-select").options[document.getElementById("category-select").selectedIndex].value;
    let unit = document.getElementById("unit-select").options[document.getElementById("unit-select").selectedIndex].value;

    getEstimates(query, sector, category, unit, 1);
});

// Get a reference to all elements with the specified tag
var elements = document.getElementsByClassName('rowHolder');

// Loop through the elements
for (var i = 0; i < elements.length; i++) {
    // Add the event listener to the current element
    elements[i].addEventListener('click', function() {
            var element = document.getElementById("hideRow"+this.getAttribute("index"))
            if(element.style.display === "none"){
                element.style.display = "table-row";
            }
            else{
                element.style.display = "none";
            }

            var elements1 = document.getElementsByClassName('rowHolder');
            for (var j=0; j<elements1.length; j++){
                if (j == parseInt(this.getAttribute("index"))){
                    continue;
                }
                document.getElementById("hideRow"+j).style.display = "none";
            }
            
    });
}