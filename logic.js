//fetching the local site
//Initialize map
let myMap = L.map("map", {
  center: [34.000904, -118.159803],
  zoom: 10
});

//Adding Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap)
// Perform a GET request to the query json file
d3.json("../Data Sets/crime.json").then(function (stateData) {

  console.log(stateData);
  // Once we get a response, send the data.features object to the createFeatures function.
  //createFeatures(stateData);

  //Type cast data
  stateData.forEach(function(data){
    data.Report_ID = parseFloat(data.Report_ID )
    data.Year = parseFloat(data.Year )
    data.Time = parseFloat(data.Time )
    data.Reporting_District = parseFloat(data.Reporting_District )
    data.Age = parseFloat(data.Age )
    data.LAT = parseFloat(data.LAT )
    data.LON = parseFloat(data.LON )
    data.CD = parseFloat(data.CD )
  });


  // Creating heat map
  let heatArray = [];

  for (let i = 1; i < stateData.length; i++){
    let location = [stateData[i].LAT, stateData[i].LON];
    if (location.every((val) => !isNaN(val))) {
      heatArray.push(location);
    }
  }
  
  let heat = L.heatLayer(heatArray, {
    radius: 20,
    blur:35
  }).addTo(myMap);


});



function createFeatures(crimeData){

  // Function to give each region a marker that describes the crime
  function onEachFeature(stateData,layer){
    layer.bindTooltip(`<h3>Location: ${stateData.Area_Name}</h3><p>Arrest Date: ${stateData.Arrest_Date}</p>`);
  };
  


  let crime = L.geoJSON(crimeData,{
    onEachFeature: onEachFeature
  });

  createMap(crime)

}

//function createMap(crime){

//  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//  });

  // Create the baseMap object
//  let baseMaps = {
//    "Street Map": street
//  };

  //Create an overlay object to hols the overlay
//  let overlayMaps = {
//    Crime: crime
//  };

//  let myMap = L.map("map", {
//    center: [34.000904, -118.159803],
//   zoom: 10
    
//  });
// Add the layer control to the map.
//  L.control.layers(baseMaps, overlayMaps, {
//    collapsed: true
//  }).addTo(myMap);

//}


