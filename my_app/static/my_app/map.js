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
        $.ajax({
            url: '/get_site_data/' + this.id + '/',
            dataType: 'json',
            success: function(data) {
                // Create the popup content
                var popupContent = '<h2>' + data.name + '</h2>' +
                                   '<p>Average rating: ' + data.average_rating + '</p>';

                // Bind the popup to the marker
                marker.bindPopup(popupContent).openPopup();

                // Update the HTML with the site data
                document.getElementById('siteName').textContent = data.name;
                document.getElementById('averageRating').textContent = 'Average rating: ' + data.average_rating;

                // Update the form action and site_id value
                document.getElementById('ratingForm').action = '/submit_rating/' + this.id + '/';
                document.getElementById('siteId').value = this.id;
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
            url: '/rate_site/',  // replace with your actual rate_site URL
            type: "POST",
            data: {
                'site_id': siteId,
                'rating': rating,
                'csrfmiddlewaretoken': $.cookie('csrftoken')  // get CSRF token from cookie
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