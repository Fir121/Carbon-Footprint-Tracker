function printEstimates(data,page){
    document.getElementById("resultholder").style.display = "block";
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

        fetch(ROOT+"/search", {
            method: "GET",
            headers:{
                'Authorization': 'Bearer '+data.key
            },
            params
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