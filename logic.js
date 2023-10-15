//Fill in the blank once API is available

//let url = 

// Perform a GET request to the query URL/
//d3.json(url).then(function (data) {

//    console.log(data)
    // Once we get a response, send the data.features object to the createFeatures function.
//  createFeatures(data.features);
//});

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


let myMap = L.map("map", {
    center: [34.000904, -118.159803],
    zoom: 10
    
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myMap);