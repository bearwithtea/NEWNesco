var map = L.map('map').setView([41.2565, -95.9345], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var sites = [
    {id: 70, name: 'Mesa Verde National Park', coords: [37.262,-108.4855556], description: "Embark on a journey through time at Mesa Verde National Park, where the ancient cliff dwellings provide a window into the lives of the Ancestral Puebloans. Wander along the mesa tops and into the depths of the canyons, where stone structures cling to the sheer cliffs, offering a glimpse into the architectural ingenuity and cultural sophistication of these early inhabitants. As you explore the park, you'll encounter not just ruins, but a living landscape shaped by centuries of human interaction and natural forces. From the petroglyphs etched into the rock faces to the panoramic views of the surrounding valleys, Mesa Verde is a place where the past comes alive, inviting visitors to ponder the mysteries of history and the enduring spirit of the people who called this place home."},
    {id: 71, name: 'Yellowstone National Park', coords: [44.46056, -110.82778], description: "Step into a world of wonder at Yellowstone National Park, where the earth's geothermal forces are on full display. From the iconic Old Faithful geyser to the colorful hot springs of the Upper Geyser Basin, the park is a living laboratory of volcanic activity and hydrothermal features. But Yellowstone is more than just geysers and hot springs; it's also a sanctuary for a diverse array of wildlife, including bison, elk, wolves, and grizzly bears. As you explore the park's vast wilderness, you'll encounter sweeping vistas, pristine lakes, and lush forests, each offering its own opportunity for adventure and discovery. Whether you're hiking through the backcountry, watching wildlife from a safe distance, or simply soaking in the natural beauty, Yellowstone is a place that captivates the imagination and leaves a lasting impression on all who visit."},
    {id: 72, name: 'Grand Canyon National Park', coords: [36.10083333, -112.0905556], description: "Prepare to be humbled by the sheer scale and majesty of the Grand Canyon, one of the world's most awe-inspiring natural wonders. Carved by the mighty Colorado River over millions of years, this immense chasm stretches for 277 miles across the Arizona landscape, revealing layer upon layer of geological history. From the rim, you'll gaze out over a panorama of towering cliffs, deep gorges, and colorful rock formations that seem to stretch to the edge of eternity. Descend into the canyon along winding trails that lead to the valley floor, where the river flows swiftly between steep canyon walls."},
    {id: 73, name: 'Everglades National Park', coords: [25.55444444, -80.99638889], description: "Delve into the heart of the Everglades, a vast and mysterious wilderness unlike any other on Earth. This unique ecosystem, often called the 'River of Grass,' is home to a staggering array of plant and animal life, from alligators and panthers to orchids and bromeliads. Explore the park by airboat, canoe, or foot, and you'll discover a landscape shaped by water, where sawgrass marshes, mangrove forests, and cypress swamps provide habitat for countless species. As you navigate the labyrinthine waterways and hidden channels, you'll encounter a world teeming with life, where every corner offers a new opportunity for adventure and exploration."},
    {id: 74, name: 'Redwood National and State Park', coords: [41.37388889, -123.9980556], description: "Lose yourself in the towering forests of Redwood National and State Parks, where ancient giants reach for the sky and time seems to stand still. These majestic trees, some of the tallest on Earth, create a cathedral-like atmosphere that inspires awe and reverence in all who enter. Wander along shaded trails that wind through groves of old-growth redwoods, their massive trunks rising hundreds of feet into the air. As you explore the parks, you'll encounter a rich tapestry of life, from delicate ferns and lush ferns to elusive wildlife like the spotted owl and Roosevelt elk."},
    {id: 75, name: 'Independence Hall', coords: [39.94861111, -75.15], description: "Step into the pages of American history at Independence Hall, where the foundations of a nation were laid and the course of human events forever altered. This iconic building in Philadelphia witnessed the birth of the United States, serving as the backdrop for the drafting and signing of both the Declaration of Independence and the U.S. Constitution. As you walk through the hallowed halls and chambers where the Founding Fathers debated the principles of liberty and self-governance, you'll feel a sense of reverence for the ideals that continue to shape the American experiment to this day. From the grandeur of the Assembly Room to the simple elegance of the West Wing, Independence Hall stands as a symbol of the enduring spirit of democracy and the power of ordinary people to effect extraordinary change."},
    {id: 76, name: 'Mammoth Cave National Park', coords: [37.18722222, -86.10305556], description: "Descend into the depths of Mammoth Cave National Park and embark on a journey into the subterranean realm of one of the world's longest known cave systems. Beneath the rolling hills of Kentucky lies a hidden world of labyrinthine passageways, colossal chambers, and breathtaking geological formations carved by the slow drip of mineral-rich water over millions of years. As you explore the cave's vast network of tunnels and caverns, you'll marvel at the sheer scale and complexity of this underground wilderness, where darkness reigns and time seems to stand still. From the eerie beauty of frozen waterfalls to the delicate formations of stalactites and stalagmites, Mammoth Cave is a place of wonder and discovery, where the mysteries of the earth are revealed in all their splendor."},
    {id: 77, name: 'Olympic National Park', coords: [47.74833333, -123.4488889], description: "Discover a world of natural wonder and untamed beauty at Olympic National Park, where rugged coastlines, lush rainforests, and towering mountains converge to create a landscape of unparalleled diversity. From the wild beaches of the Pacific Coast to the mist-shrouded peaks of the Olympic Mountains, the park offers a wealth of opportunities for exploration and adventure. Hike through ancient forests of towering trees, where moss-covered branches reach for the sky and hidden waterfalls cascade into crystal-clear pools. Explore pristine wilderness areas where wildlife roams freely, from elusive mountain goats to majestic Roosevelt elk."},
    {id: 78, name: 'Cahokia Mounds State Historic Site', coords: [38.65861111, -90.06138889], description: "Journey back in time to the ancient city of Cahokia, where the Mississippi River once flowed past towering earthen mounds and bustling plazas filled with life and activity. This pre-Columbian archaeological site, located in present-day Illinois, was once the largest urban center north of Mexico, home to tens of thousands of people who built a thriving civilization on the banks of the river. Explore the remains of massive earthworks, including the iconic Monk's Mound, which rises over 100 feet above the surrounding landscape. As you wander through the site, you'll encounter evidence of a complex society that developed sophisticated agricultural techniques, intricate trade networks, and elaborate ceremonial practices."},
    {id: 79, name: 'Great Smoky Mountains National Park', coords: [35.59305556, -83.43555556], description: "Experience the timeless beauty of the Great Smoky Mountains, where mist-shrouded peaks rise above verdant valleys, and cascading waterfalls tumble into clear mountain streams. Spanning the border between Tennessee and North Carolina, this iconic national park is home to some of the most biologically diverse ecosystems in the world, with thousands of plant and animal species thriving in its rugged terrain. Hike along scenic trails that wind through old-growth forests of towering hemlocks and ancient hardwoods, pausing to admire panoramic views of the surrounding mountains and valleys. Explore historic homesteads and rustic cabins that offer a glimpse into the lives of early Appalachian settlers, or simply relax and soak in the natural beauty of this pristine wilderness."},
    {id: 80, name: 'La Fortaleza and San Juan National Historic Site in Puerto Rico', coords: [18.46666667, -66.125], description: "Immerse yourself in the rich tapestry of Puerto Rico's colonial history at La Fortaleza and San Juan National Historic Site, where centuries-old fortifications stand as silent sentinels overlooking the turquoise waters of the Caribbean Sea. Explore the cobblestone streets of Old San Juan, where colorful colonial buildings and ancient city walls bear witness to a tumultuous past shaped by Spanish conquest and colonial rule. Wander through the historic district's charming plazas and leafy courtyards, where the rhythms of salsa music fill the air and the scent of tropical flowers hangs heavy. Step inside La Fortaleza, the oldest executive mansion in continuous use in the Americas, and discover the stories of the governors who have lived within its walls since the 16th century. From the imposing ramparts of Castillo San Felipe del Morro to the elegant arches of La Puerta de San Juan, every corner of this UNESCO World Heritage site is steeped in history and alive with the vibrant spirit of Puerto Rico."},
    {id: 81, name: 'Statue of Liberty', coords: [40.68944444, -74.04472222], description: "Stand in awe before the Statue of Liberty, a towering symbol of freedom and democracy that has welcomed generations of immigrants to the shores of America. This iconic statue, a gift from the people of France to the United States, stands on Liberty Island in New York Harbor, her torch held high as a beacon of hope and inspiration to people around the world. Ascend to the statue's pedestal and gaze out over the skyline of Manhattan, where the bustling metropolis serves as a testament to the ideals of liberty, opportunity, and diversity that have defined the American experience. From the solemn beauty of Ellis Island, where millions of immigrants first set foot on American soil, to the stirring words of Emma Lazarus inscribed on the pedestal's base, the Statue of Liberty is a symbol of welcome and acceptance, reminding us that America's strength lies in its diversity and its commitment to freedom for all."},
    {id: 82, name: 'Yosemite National Park', coords: [37.74611111, -119.5966667], description: "Enter a realm of sublime beauty and natural wonder at Yosemite National Park, where towering granite cliffs, thundering waterfalls, and pristine wilderness combine to create a landscape of breathtaking grandeur. From the iconic granite monolith of El Capitan to the ethereal beauty of Bridalveil Fall, the park's dramatic landmarks inspire awe and admiration in all who behold them. Hike through alpine meadows ablaze with wildflowers, or venture into the deep valleys carved by ancient glaciers, where the mighty Merced River winds its way through forested canyons and past secluded swimming holes. Explore the park's rich biodiversity, from elusive black bears and mountain lions to rare species of birds and butterflies."},
    {id: 83, name: 'Chaco Culture', coords: [36.06377778, -107.9708333], description: "Journey to the heart of the American Southwest and discover the ancient ruins of Chaco Canyon, where the remnants of a once-thriving civilization stand as a testament to the ingenuity and cultural achievements of the Ancestral Puebloans. Explore the Great Houses of Chaco, monumental stone structures that served as centers of ceremony, trade, and community life more than a thousand years ago. Marvel at the precision with which these ancient architects aligned their buildings with the movements of the sun, moon, and stars, creating a sacred landscape that still inspires wonder and reverence today. Hike along ancient roads that once linked Chaco Canyon with distant communities across the desert Southwest, or simply sit in quiet contemplation beneath the vast desert sky."},
    {id: 84, name: 'Hawaii Volcanoes National Park', coords: [19.40083333, -155.1236111], description: "Explore the dynamic landscapes of Hawaii Volcanoes National Park, where fiery volcanoes, lush rainforests, and crystalline beaches converge to create a paradise unlike any other on Earth. Witness the raw power of volcanic activity as molten lava flows from the summit of Kilauea, one of the world's most active volcanoes, and pours into the sea in a spectacular display of nature's fury. Hike through ancient lava fields and lunar landscapes, where steam vents hiss and sputter and the earth feels alive beneath your feet. Explore the park's diverse ecosystems, from the lush rainforests of the Kilauea Caldera to the barren expanses of the Ka'u Desert, home to rare species found nowhere else on Earth."},
    {id: 85, name: 'Monticello and the University of Virginia in Charlottesville', coords: [38.03277778, -78.50388889], description: "Step into the world of Thomas Jefferson at Monticello, his meticulously designed estate nestled in the rolling hills of Virginia. Explore the iconic domed architecture and lush gardens that reflect Jefferson's vision of the ideal home, where classical influences blend seamlessly with natural beauty. Wander through the meticulously preserved rooms where Jefferson lived and worked, from his private library filled with books on philosophy and science to the elegant parlor where he entertained guests and debated the principles of democracy. Venture beyond the estate to the University of Virginia, founded by Jefferson as an 'academical village' where students and faculty would live and learn together in pursuit of knowledge and enlightenment."},
    {id: 86, name: 'Taos Pueblo', coords: [36.438, -105.546], description: "Experience the living history of Taos Pueblo, a UNESCO World Heritage site and one of the oldest continuously inhabited communities in the United States. Nestled in the shadow of the Sangre de Cristo Mountains of New Mexico, this ancient pueblo has been home to the Taos people for over a thousand years. Explore the narrow, winding streets of the pueblo, where multi-story adobe buildings rise in terraced layers against the desert sky. Step inside the sacred spaces of the pueblo's ancient churches and kivas, where traditional ceremonies and rituals have been performed for centuries. Meet the residents who continue to maintain their cultural traditions and way of life, from pottery-making and weaving to farming and communal governance."},
    {id: 87, name: 'Carlsbad Caverns National Park', coords: [32.16666667, -104.3833333], description: "Descend into the depths of Carlsbad Caverns National Park and discover a hidden world of subterranean wonders, where colossal caverns, intricate formations, and mysterious underground rivers await. Follow winding trails through caverns adorned with stalactites, stalagmites, and delicate formations that seem to defy gravity. Marvel at the Cathedral Room, a vast chamber where towering columns rise like ancient pillars in a grand cathedral of stone. Venture deeper into the cave system to explore lesser-known passages and chambers, where otherworldly formations and hidden treasures await around every corner. Experience the eerie beauty of the caverns illuminated by the soft glow of electric lights, or embark on a guided tour to delve deeper into the park's geological history and ecological significance."},
    {id: 88, name: 'Papahānaumokuākea', coords: [25.34907, -170.14582], description: "Dive into the pristine waters of Papahānaumokuākea Marine National Monument and discover a vast underwater wilderness teeming with life and color. Located in the remote Northwestern Hawaiian Islands, this UNESCO World Heritage site encompasses over half a million square miles of ocean, making it one of the largest protected areas on the planet. Explore vibrant coral reefs teeming with tropical fish, endangered sea turtles, and majestic manta rays, or dive deeper into the ocean's depths to encounter elusive species like the Hawaiian monk seal and the endangered Hawaiian green sea turtle. As you explore the monument's pristine waters and uninhabited islands, you'll encounter a thriving ecosystem shaped by centuries of isolation and evolution."},
    {id: 89, name: 'Monumental Earthworks of Poverty Point', coords: [32.63694444, -91.40638889], description: "Explore the ancient earthworks of Poverty Point, a prehistoric archaeological site in northeastern Louisiana that offers a window into the lives and culture of ancient Native American civilizations. Dating back over 3,000 years, the site is home to a complex network of earthen mounds, ridges, and concentric rings that were once the center of a thriving community. Wander through the expansive plaza area, where ceremonial activities and gatherings once took place, or climb to the top of the site's largest mound for panoramic views of the surrounding landscape. Explore the remnants of ancient habitation, including fire pits, storage pits, and clay artifacts that offer clues to the daily life and rituals of the people who lived here millennia ago."},
    {id: 90, name: 'San Antonio Missions', coords: [29.32805556, -98.46], description: "Journey along the San Antonio River and discover the historic missions that played a vital role in the settlement and development of the American Southwest. Founded by Spanish Franciscan friars in the 18th century, these missions served as religious and cultural centers for the local Native American populations, as well as hubs of agriculture, industry, and education. Explore the beautifully preserved churches, courtyards, and living quarters that make up each mission complex, from the iconic facades of Mission San Jose to the tranquil gardens of Mission Concepcion. Learn about the daily lives of the missionaries and indigenous peoples who lived and worked within the mission walls, and discover the enduring legacy of their cultural exchange and collaboration."},
    {id: 91, name: 'The 20th-Century Architecture of Frank Lloyd Wright', coords: [39.90557083, -79.46647556], description: "Experience the visionary designs of Frank Lloyd Wright, whose innovative architecture revolutionized the American landscape and continues to inspire architects and designers around the world. From the organic forms of Fallingwater to the geometric precision of the Guggenheim Museum, Wright's buildings are renowned for their harmonious integration with the natural environment and their pioneering use of materials and construction techniques. Explore Wright's iconic structures, from private residences and public buildings to museums and commercial spaces, and discover the principles of organic architecture that guided his work."},
    {id: 92, name: 'Hopewell Ceremonial Earthworks', coords: [40.05365833, -82.44606111], description: "Step into the ancient past at Hopewell Ceremonial Earthworks, where mysterious geometric earthworks and monumental mounds bear witness to the ceremonial practices of ancient Native American cultures over 2,000 years ago. Located in present-day Ohio, this UNESCO World Heritage site is home to a complex network of earthen enclosures, embankments, and burial mounds that were once the focal points of religious and social gatherings for the Hopewell culture. Explore the site's intricate geometric patterns and alignments, which are thought to have been used for astronomical observations and ceremonial rituals. Marvel at the sheer scale and precision of the earthworks, which were constructed using simple tools and manual labor by a society that had no written language or metal tools."},
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

                var site = sites.find(site => site.name === data.name); //this is a crazy function what the freak!

                if (site) {
                    var description = site.description;
                } else {
                    var description = 'No description available for ' + data.name + '.';
                }

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