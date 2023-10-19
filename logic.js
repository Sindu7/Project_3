//Fill in the blank once API is available

let url = "http://127.0.0.1:5000/api/data"

//fetching the local site

// Perform a GET request to the query URL/
d3.json(url).then(function (data) {

    console.log(`Data:${data}`)
    // Once we get a response, send the data.features object to the createFeatures function.
  //createFeatures(data);
});

//function createMarker(){
//    let markers = {
//        radius: ,
//        fillColor: chooseColor(),
//        color: chooseColor(),
//        fillOpacity: 0.5,
//        weight: 0.5
//    }
//    return L.circleMarker();
//};

function createFeatures(crimeData){

  // Function to give each region a marker that describes the crime
  function onEachFeature(data,layer){
    layer.bindTooltip(`<h3>Location: ${data.Area_Name}</h3><p>Arrest Date: ${data.Arrest_Date}</p>`);
  };

  // Funtion to create HeatMap
  function createHeatmap(data,latlng){
    let heatArray = [];

    for (let i = 0; i < data.length; i++){
      let location = [data.LON[i], data.LAT[i]];
      if (location) {
        heatArray.push([location.LAT, location.LON]);
      }
    }
  
    return L.heatLayer(heatArray, {
      radius: 20,
      blur:35
    }).addTo(myMap)
  };
  

  createMap(crimeData)

}

function createMap(crime){

  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create the baseMap object
  let baseMaps = {
    "Street Map": street
  };

  //Create an overlay object to hols the overlay
  let overlayMaps = {
    Crime: crime
  };

  let myMap = L.map("map", {
    center: [34.000904, -118.159803],
    zoom: 10
    
  });
// Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);

}


