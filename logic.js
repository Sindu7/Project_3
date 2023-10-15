


let myMap = L.map("map", {
    center: [34.000904, -118.159803],
    zoom: 10
    
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myMap);