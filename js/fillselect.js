/* THIS FILE IS JUST RAW DATA INSERTED INTO THE SELECTORS, THE DATA HAS BEEN SCRAPED FROM THE API */
let sectoritems = [
    "Agriculture/Hunting/Forestry/Fishing",
    "Buildings and Infrastructure", 
    "Consumer Goods and Services",
    "Education", 
    "Energy", 
    "Equipment", 
    "Health and Social Care", 
    "Information and Communication", 
    "Insurance and Financial Services", 
    "Land Use", 
    "Materials and Manufacturing", 
    "Organizational Activities", 
    "Refrigerants and Fugitive Gases", 
    "Restaurants and Accommodation", 
    "Transport", 
    "Waste", 
    "Water"
];
let sectorselect = document.getElementById("sector-select");
for (let i = 0; i < sectoritems.length; i++) {
    let option = document.createElement("option");
    option.value = sectoritems[i];
    option.text = sectoritems[i];
    sectorselect.appendChild(option);
}

let categoryitems = [
    "Accommodation",
    "Agriculture/Hunting/Forestry/Fishing",
    "Air Freight", 
    "Air Travel", 
    "Arable Farming", 
    "Building Materials", 
    "Ceramic Goods", 
    "Chemical Products", 
    "Chemical Waste", 
    "Chemicals", 
    "Clothing and Footwear", 
    "Cloud Computing - CPU", 
    "Cloud Computing - Memory", 
    "Cloud Computing - Networking", 
    "Cloud Computing - Storage", 
    "Construction", 
    "Construction Waste", 
    "Consumer Goods Rental", 
    "DIY and Gardening Equipment",
    "Domestic Services", 
    "Domestic services", 
    "Education",
    "Electrical Equipment",
    "Electrical Waste",
    "Electricity",
    "Electronics",
    "Energy Services",
    "Equipment and Machinery",
    "Equipment Rental",
    "Equipment Repair",
    "Fabricated Metal Products",
    "Financial Services",
    "Fishing/Aquaculture/Hunting",
    "Food and Beverage Services",
    "Food and Organic Waste",
    "Food/Beverages/Tobacco",
    "Fuel",
    "Furnishings and Household",
    "General Retail",
    "General Waste",
    "Glass and Glass Products",
    "Glass Waste",
    "Government Activities",
    "Health and Social Care",
    "Health Care",
    "Heat and Steam",
    "Homeworking",
    "Housing",
    "Information and Communication Services",
    "Infrastructure",
    "Insurance Services",
    "Land Use Change",
    "Livestock Farming",
    "Machinery",
    "Maintenance and Repair",
    "Manufacturing",
    "Metal Waste",
    "Metals",
    "Mined Materials",
    "Mining",
    "Non-profit Activities",
    "Office equipment",
    "Office Equipment",
    "Operational Activities",
    "Organic Products",
    "Organizational Activities",
    "Other Materials",
    "Paper and Cardboard",
    "Paper and Cardboard Waste",
    "Paper Products",
    "Pavement and Surfacing",
    "Personal Care and Accessories",
    "Plastic Waste",
    "Plastics and Rubber Products",
    "Professional services",
    "Professional Services and Activities",
    "Rail Freight",
    "Rail Travel",
    "Real Estate",
    "Recreation and Culture",
    "Refrigerants and Fugitive Gases",
    "Restaurants and Accommodation",
    "Road Freight",
    "Road Travel",
    "Sea Freight",
    "Sea Travel",
    "Social Care",
    "Textiles",
    "Tickets and Passes",
    "Timber and Forestry Products",
    "Transport Services and Warehousing",
    "Utilities",
    "Vehicle Maintenance and Services",
    "Vehicle Parts",
    "Vehicles",
    "Waste Management",
    "Water Supply",
    "Water Treatment",
    "Wholesale Trade"
];
let categoryselect = document.getElementById("category-select");
for (let i = 0; i < categoryitems.length; i++) {
    let option = document.createElement("option");
    option.value = categoryitems[i];
    option.text = categoryitems[i];
    categoryselect.appendChild(option);
}
/*
"AreaOverTime",
"ContainerOverDistance",
"DataOverTime",
"DistanceOverTime",
"Number",
"NumberOverTime",
"PassengerOverDistance",
"WeightOverDistance",
"WeightOverTime"
*/
let unititems = [
    "Area",
    "Data",
    "Distance",
    "Energy",
    "Money",
    "Time",
    "Volume",
    "Weight",
];
let unitselect = document.getElementById("unit-select");
for (let i = 0; i < unititems.length; i++) {
    let option = document.createElement("option");
    option.value = unititems[i];
    option.text = unititems[i];
    unitselect.appendChild(option);
}