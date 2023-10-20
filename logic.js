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
d3.json("../Project_3/Data Sets/crime.json").then(function (stateData) {

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


   // Create a dictionary to hold layers of each year
   let yearLayers = {};

   // Heat map data of all years combined
   let heatArray = [];
 
   // Loop through for coordinates
   for (let i = 1; i < stateData.length; i++) {
     let location = [stateData[i].LAT, stateData[i].LON];
       heatArray.push(location);
     
 
     // Group data by year in the yearLayers dictionary
     let year = stateData[i].Year;
     if (!yearLayers[year]) {
       yearLayers[year] = [];
     }
     yearLayers[year].push(location);
   }
 
   // Create the heat layer for all data
   let heatLayerAll = L.heatLayer(heatArray, {
     radius: 20,
     blur: 35,
   }).addTo(myMap);
 
   // Create an overlay object
   let overlayMaps = {
     "All Years": heatLayerAll,
   };
 
   // Loop through yearLayers and Add layers for each year and overlay to filter by year 
   for (let year in yearLayers) {
     let heatLayerYear = L.heatLayer(yearLayers[year], {
       radius: 20,
       blur: 35,
     });
     overlayMaps[year] = heatLayerYear;
   }
 
   // Create the layer control
   L.control.layers(null, overlayMaps, {
     collapsed: false
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
