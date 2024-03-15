var map = L.map('map').setView([41.2565, -95.9345], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([37.262,-108.4855556]).addTo(map);

var mesaVerde = L.popup() 
    .setLatLng([37.262,-108.4855556])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Mesa Verde National Park</b>").openPopup();

var marker = L.marker([44.46056, -110.82778]).addTo(map);

var yellowStone = L.popup() 
    .setLatLng([44.46056, -110.82778])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Yellowstone National Park</b>").openPopup();

var marker = L.marker([36.10083333, -112.0905556]).addTo(map);

var grandCanyon = L.popup() 
    .setLatLng([36.10083333, -112.0905556])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Grand Canyon National Park</b>").openPopup();

var marker = L.marker([25.55444444, -80.99638889]).addTo(map);

var everGlades = L.popup() 
    .setLatLng([25.55444444, -80.99638889])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Everglades National Park</b>").openPopup();

var marker = L.marker([39.9489,-75.1500]).addTo(map);

var IndependenceHall = L.popup() 
    .setLatLng([39.9489,-75.1500])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Independence Hall</b>").openPopup();


var marker = L.marker([41.37388889,-123.9980556]).addTo(map);

var redWoods = L.popup() 
    .setLatLng([41.37388889,-123.9980556])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Redwood National and State Parks</b>").openPopup();

var marker = L.marker([37.18722222,-86.10305556]).addTo(map);

var mammothCave = L.popup() 
    .setLatLng([37.18722222,-86.10305556])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Mammoth Cave National Park</b>").openPopup();

var marker = L.marker([47.74833333,-123.4488889]).addTo(map);

var olympicPark = L.popup() 
    .setLatLng([47.74833333,-123.4488889])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Olympic National Park</b>").openPopup();

var marker = L.marker([40.689247,-74.044502]).addTo(map);

var statueOfLiberty = L.popup() 
    .setLatLng([40.689247,-74.044502])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>The Statue of Liberty</b>").openPopup();

var marker = L.marker([38.030121, -78.476655]).addTo(map);

var Monticello = L.popup() 
    .setLatLng([38.030121, -78.476655])
    .setContent("")
    .openOn(map);

    marker.bindPopup("<b>Monticello and the University of Virginia in Charlottesville</b>").openPopup();

var marker = L.marker([38.030121, -78.476655]).addTo(map);