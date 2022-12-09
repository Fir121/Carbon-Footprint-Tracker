function printEstimates(data,page){
    document.getElementById("resultholder").style.display = "block";
    var holder =  document.getElementById("colshere");
    console.log(data);
    var tofill = data.results;
    for (var i=0; i<tofill.length; i++){
        var row = document.createElement("tr");
        row.className = "rowHolder";
        row.setAttribute("index", i);
        row.addEventListener('click', function() {
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
        cell.textContent = tofill[i]["unit_type"][0];
        row.appendChild(cell);

        holder.appendChild(row);

        var row = document.createElement("tr");
        row.id = "hideRow"+i;
        row.style.display = "none";
        var cell = document.createElement("td");
        cell.colSpan = "4";
        cell.className = "description-collapse";
        cell.innerHTML = tofill[i]["description"];
        row.appendChild(cell);

        holder.appendChild(row);
    } 
}

function getEstimates(query, sector, category, unit, page){
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