/*
    ALL FUNCTIONS RELATED TO THE SEARCHING OF EMISSION TYPES
*/

function printEstimates(data,page){
    // PRINT RECEIVED DATA TO TABLE
    document.getElementById("resultholder").style.display = "block";
    var holder =  document.getElementById("colshere");
    var tofill = data.results;
    count = 0;
    for (var i=0; i<tofill.length; i++){
        if (tofill[i] === null){
            continue;
        }
        count++;
        var row = document.createElement("tr");
        row.classList.add("rowHolder","noselect");
        row.setAttribute("index", count-1);
        row.addEventListener('click', function() {
                var element = document.getElementById("hideRow"+this.getAttribute("index"))
                if(element.style.opacity === "0"){
                    element.style.height = "";
                    element.style.opacity = "";
                    element.children[0].style.padding = "";
                    for (var i = 0; i < element.children[0].children.length; i++) {
                        element.children[0].children[i].style.display = "block";
                    }
                }
                else{
                    element.style.height = "0";
                    element.style.opacity = "0";
                    element.children[0].style.padding = "0";
                    for (var i = 0; i < element.children[0].children.length; i++) {
                        element.children[0].children[i].style.display = "none";
                    }
                }

                var elements1 = document.getElementsByClassName('rowHolder');
                for (var j=0; j<elements1.length; j++){
                    if (j == parseInt(this.getAttribute("index"))){
                        continue;
                    }
                    var element2 = document.getElementById("hideRow"+j);
                    if (element2 === null){
                        continue
                    }
                    element2.style.height = "0";
                    element2.style.opacity = "0";
                    element2.children[0].style.padding = "0";
                    for (var i = 0; i < element2.children[0].children.length; i++) {
                        element2.children[0].children[i].style.display = "none";
                    }
                }
                
        });
        var cell = document.createElement("td");
        cell.textContent = tofill[i]["name"];
        row.appendChild(cell);
        var cell = document.createElement("td");
        cell.textContent = tofill[i]["sector"];
        row.appendChild(cell);
        var cell = document.createElement("td");
        cell.textContent = tofill[i]["category"];
        row.appendChild(cell);
        var cell = document.createElement("td");
        cell.textContent = tofill[i]["unit"].replace("kg/","");
        row.appendChild(cell);

        holder.appendChild(row);

        var row = document.createElement("tr");
        row.id = "hideRow"+(count-1);
        row.style.opacity = "0";
        row.style.height = "0";
        var cell = document.createElement("td");
        cell.style.padding = "0";
        cell.colSpan = "4";
        cell.className = "description-collapse";
        var textdesc = document.createElement("p");
        textdesc.innerHTML = tofill[i]["description"];
        var but = document.createElement("button");
        but.textContent = "OPEN CALCULATOR";
        but.classList.add("btn","btn-primary");
        but.addEventListener("click", (function(data){
            return function(){
                openCalculator(data);
            }
        })(tofill[i]));
        textdesc.style.display = "none";
        but.style.display = "none";
        cell.appendChild(textdesc);
        cell.appendChild(but);
        row.appendChild(cell);

        holder.appendChild(row);
    } 
    if (count == 0){
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.classList.add("text-danger", "text-center");
        cell.colSpan = "4";
        cell.innerHTML = "<b>No Results Found!</b>"
        row.appendChild(cell);
        holder.appendChild(row);
    }
}

function getEstimates(query, sector, category, unit, page){
    // GET DATA FROM API
    fetch("https://carbonemissiontracker.pythonanywhere.com/getkey", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        const params = new URLSearchParams();
        params.append("query", query);
        params.append("page",page);
        if (sector != "All"){params.append("sector",sector);}
        if (category != "All"){params.append("category",category);}
        if (unit != "Any"){params.append("unit_type",unit);}

        fetch(ROOT+"/search?"+params, {
            method: "GET",
            headers:{
                'Authorization': 'Bearer '+data.key
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("suggestions").style.display = "none";
            document.getElementById("colshere").innerHTML = "";

            document.getElementById("pages").innerHTML = data.current_page+" of "+data.last_page;
            document.getElementById("prevtable").onclick = function(){
                if (page > 1){
                    getEstimates(query, sector, category, unit, page-1);
                }
            }
            document.getElementById("nexttable").onclick = function(){
                if (page < data.last_page){
                    getEstimates(query, sector, category, unit, page+1);
                }
            }
            for (var i=0; i<data.results.length; i++){
                for (var j=0; j<NOTALLOWED.length; j++){
                    if (data.results[i].unit_type.indexOf(NOTALLOWED[j]) > -1){
                        data.results[i] = null;
                        break;
                    }
                }
            }
            printEstimates(data,page);
            // do something with the response data
        })
        .catch(error => {
            console.log(error);
            // handle any errors
        });
        // do something with the response data
    })
    .catch(error => {
        console.log(error);
        // handle any errors
    });
}

function insertSearch(d){
    // USED IN SEARCH SUGGESTIONS, AUTO SEARCH
    document.getElementById("searchbar").value = d;
    getEstimates(d, "All", "All", "Any", 1);
}

function closeTable(){
    // CLOSES TABLE
    if (document.getElementById("myreport").style.display === "none"){
        document.getElementById('suggestions').style.display = 'block';
    }

    document.getElementById("resultholder").style.display = "none";
}