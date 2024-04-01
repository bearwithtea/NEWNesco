var map = L.map('map').setView([41.2565, -95.9345], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var sites = [
    {id: 42, name: 'Mesa Verde National Park', coords: [37.262,-108.4855556]},
    {id: 43, name: 'Yellowstone National Park', coords: [44.46056, -110.82778]},
    //FIXME: Add the rest of the sites.
];

sites.forEach(function(site) {
    let marker = L.marker(site.coords).addTo(map);
    marker.id = site.id;
    marker.on('click', function() {
        let markerId = this.id; 
        $.ajax({
            url: '/get_site_data/' + markerId + '/',
            dataType: 'json',
            success: function(data) {
                var popupContent = '<h2>' + data.name + '</h2>' +
                                   '<p>Average rating: ' + data.average_rating.toFixed(2) + '</p>';

                marker.bindPopup(popupContent).openPopup();

                document.getElementById('siteName').textContent = data.name;

                var description = 'This is a short description of ' + data.name + '.';
                document.getElementById('extraSiteInfo').textContent = description;

                document.getElementById('averageRating').textContent = 'Average rating: ' + data.average_rating;

                document.getElementById('ratingForm').action = '/submit_rating/' + markerId + '/';  
                document.getElementById('siteId').value = markerId; 

                var directionsLink = document.getElementById('directionsLink');
                directionsLink.href = 'https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=' + site.coords[0] + ',' + site.coords[1];
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