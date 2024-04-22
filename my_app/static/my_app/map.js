var map = L.map('map').setView([41.2565, -95.9345], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//FIXME: Cannot properly pass the coordinates into the Google Maps API.
var sites = [
    {id: 42, name: 'Mesa Verde National Park', coords: [37.262,-108.4855556]},
    {id: 43, name: 'Yellowstone National Park', coords: [44.46056, -110.82778]},
    {id: 44, name: 'Grand Canyon National Park', coords: [36.10083333, -112.0905556]},
    {id: 45, name: 'Everglades National Park', coords: [25.55444444, -80.99638889]},
    {id: 46, name: 'Redwood National and State Park', coords: [41.37388889, -123.9980556]},
    {id: 47, name: 'Independence Hall', coords: [39.94861111, -75.15]},
    {id: 48, name: 'Mammoth Cave National Park', coords: [37.18722222, -86.10305556]},
    {id: 49, name: 'Olympic National Park', coords: [47.74833333, -123.4488889]},
    {id: 50, name: 'Cahokia Mounds State Historic Site', coords: [38.65861111, -90.06138889]},
    {id: 51, name: 'Great Smoky Mountains National Park', coords: [35.59305556, -83.43555556]},
    {id: 52, name: 'La Fortaleza and San Juan National Historic Site in Puerto Rico', coords: [18.46666667, -66.125]},
    {id: 53, name: 'Statue of Liberty', coords: [40.68944444, -74.04472222]},
    {id: 54, name: 'Yosemite National Park', coords: [37.74611111, -119.5966667]},
    {id: 55, name: 'Chaco Culture', coords: [36.06377778, -107.9708333]},
    {id: 56, name: 'Hawaii Volcanoes National Park', coords: [19.40083333, -155.1236111]},
    {id: 57, name: 'Monticello and the University of Virginia in Charlottesville', coords: [38.03277778, -78.50388889]},
    {id: 58, name: 'Taos Pueblo', coords: [36.438, -105.546]},
    {id: 59, name: 'Carlsbad Caverns National Park', coords: [32.16666667, -104.3833333]},
    {id: 60, name: 'Papahānaumokuākea', coords: [25.34907, -170.14582]},
    {id: 61, name: 'Monumental Earthworks of Poverty Point', coords: [32.63694444, -91.40638889]},
    {id: 62, name: 'San Antonio Missions', coords: [29.32805556, -98.46]},
    {id: 63, name: 'The 20th-Century Architecture of Frank Lloyd Wright', coords: [39.90557083, -79.46647556]},
    {id: 64, name: 'Hopewell Ceremonial Earthworks', coords: [40.05365833, -82.44606111]},
];

sites.forEach(function(site) {
    let marker = L.marker(site.coords).addTo(map).bindPopup('<h2>' + site.name + '</h2>');
    marker.id = site.id;
    marker.on('click', function() {
        let markerId = this.id; 
        $.ajax({
            url: '/get_site_data/' + markerId + '/',
            dataType: 'json',
            success: function(data) {
                var popupContent = '<h2>' + data.name + '</h2>' +
                                   '<p>Average rating: ' + data.average_rating.toFixed(2) + '</p>';

                marker.setPopupContent(popupContent).openPopup();

                document.getElementById('siteName').textContent = data.name;

                var description = 'This is a short description of ' + data.name + '.';
                document.getElementById('extraSiteInfo').textContent = description;

                document.getElementById('averageRating').textContent = 'Average rating: ' + data.average_rating.toFixed(2);

                document.getElementById('ratingForm').action = '/submit_rating/' + markerId + '/';  
                document.getElementById('siteId').value = markerId; 

                var directionsLink = document.getElementById('directionsLink');
                directionsLink.href = 'https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=' + site.coords[0].toFixed(6) + ',' + site.coords[1].toFixed(6);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
            }
        });
    });
});

$(document).ready(function() {
    $(".submitRating").click(function(e) {
        e.preventDefault();
        var formId = $(this).parent().attr('id');
        var rating = $("#" + formId + " input[name='rating']").val();
        var siteId = $("#" + formId + " input[name='site_id']").val();
        $.ajax({
            url: '/map_view/',
            type: 'POST',
            data: {
                'rating': rating,
                'csrfmiddlewaretoken': $.cookie('csrftoken') 
            },
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    alert("Rating submitted successfully.");
                }
            }
        });
    });
});

document.querySelectorAll('.site').forEach(function(site) {
    site.addEventListener('click', function() {
        var siteId = this.dataset.siteId;
        var siteName = sites.find(s => s.id === parseInt(siteId)).name; 
        document.getElementById('site_name').textContent = siteName; 

        fetch('/get_ratings/' + siteId + '/')
            .then(response => response.json())
            .then(data => {
                var ratingsElement = document.getElementById('ratings');
                ratingsElement.innerHTML = '';
                data.ratings.forEach(function(rating) {
                    var ratingElement = document.createElement('p');
                    ratingElement.textContent = 'Rating: ' + rating.value;
                    ratingsElement.appendChild(ratingElement);
                });
                var averageRatingElement = document.getElementById('average_rating');
                averageRatingElement.textContent = 'Average rating: ' + data.average_rating;
            });
    });
});

var csrftoken = getCookie('csrftoken');

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}