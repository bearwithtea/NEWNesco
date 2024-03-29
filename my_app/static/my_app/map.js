var map = L.map('map').setView([41.2565, -95.9345], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker1 = L.marker([37.262,-108.4855556]).addTo(map);
marker1.bindPopup("<b>Mesa Verde National Park</b>").openPopup();
marker1.on('click', function() {
    document.getElementById('info').innerHTML = 'Located in the bottom right of Colorado, Mesa Verde National Park is a U.S. National Park and UNESCO World Heritage Site. The park protects some of the best-preserved Ancestral Puebloan archaeological sites in the United States. The park was created by President Theodore Roosevelt in 1906. It occupies 52,485 acres near the Four Corners region of the American Southwest. With more than 5,000 sites, including 600 cliff dwellings, it is the largest archaeological preserve in the U.S. The park is located in Montezuma County, Colorado, near the town of Cortez, in the Southwestern part of the state, about 40 miles west of Durango. The park features numerous ruins of homes and villages built by the Ancestral Puebloans. The Ancestral Puebloans made stone villages their home in the 1200s. The park is filled with canyons, mesas, and mountains, and is located at the edge of the San Juan National Forest. The park is named for the Spanish word for "green table," referring to the mesas that make up the park';
});

var marker2 = L.marker([44.46056, -110.82778]).addTo(map);
marker2.bindPopup("<b>Yellowstone National Park</b>").openPopup();
marker2.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about Yellowstone National Park';
});

var marker3 = L.marker([36.10083333, -112.0905556]).addTo(map);
marker3.bindPopup("<b>Grand Canyon National Park</b>").openPopup();
marker3.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about Grand Canyon National Park';
});

var marker4 = L.marker([25.55444444, -80.99638889]).addTo(map);
marker4.bindPopup("<b>Everglades National Park</b>").openPopup();
marker4.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about Everglades National Park';
});

var marker5 = L.marker([39.9489,-75.1500]).addTo(map);
marker5.bindPopup("<b>Independence Hall</b>").openPopup();
marker5.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about Independence Hall';
});

var marker6 = L.marker([41.37388889,-123.9980556]).addTo(map);
marker6.bindPopup("<b>Redwood National and State Parks</b>").openPopup();
marker6.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about Redwood National and State Parks';
});

var marker7 = L.marker([37.18722222,-86.10305556]).addTo(map);
marker7.bindPopup("<b>Mammoth Cave National Park</b>").openPopup();
marker7.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about Mammoth Cave National Park';
});

var marker8 = L.marker([47.74833333,-123.4488889]).addTo(map);
marker8.bindPopup("<b>Olympic National Park</b>").openPopup();
marker8.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about Olympic National Park';
});

var marker9 = L.marker([40.689247,-74.044502]).addTo(map);
marker9.bindPopup("<b>The Statue of Liberty</b>").openPopup();
marker9.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about The Statue of Liberty';
});

var marker10 = L.marker([38.030121, -78.476655]).addTo(map);
marker10.bindPopup("<b>Monticello and the University of Virginia in Charlottesville</b>").openPopup();
marker10.on('click', function() {
    document.getElementById('info').innerHTML = 'Additional information about Monticello and the University of Virginia in Charlottesville';
});

var stars = document.querySelectorAll('.star');
stars.forEach(function(star) {
    star.addEventListener('click', function() {
        var rating = this.getAttribute('data-rating');
        fetch('/rate_site', {
            method: 'POST',
            body: JSON.stringify({
                site_id: 1,
                rating: rating
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });
});