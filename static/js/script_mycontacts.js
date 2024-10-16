function chgimg(name, txt) {
    var theImage = document.getElementById("image");
    theImage.src = name;
    theImage.alt = txt;
}

function showImg(row) {
    const img = row.querySelector('img');
    if (img) {
        img.style.display = 'inline';
    }
}

function hideImg(row) {
    const img = row.querySelector('img');
    if (img) {
        img.style.display = 'none';
    }
}

var map;
var geocoder;
var markers = [];

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 44.9727, lng: -93.23540000000003 }
    });

    geocoder = new google.maps.Geocoder();

    placeMarkersForContacts();

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    document.querySelector("input[type='submit']").addEventListener("click", function (e) {
        e.preventDefault();
        calculateAndDisplayRoute();
    });
}

function calculateAndDisplayRoute() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var destination = document.getElementById("dirTo").value;

            var selectedMode = document.querySelector("input[name='travelType']:checked").value;
            var travelMode;
            switch (selectedMode) {
                case "WALK":
                    travelMode = google.maps.TravelMode.WALKING;
                    break;
                case "DRIVE":
                    travelMode = google.maps.TravelMode.DRIVING;
                    break;
                case "TRANS":
                    travelMode = google.maps.TravelMode.TRANSIT;
                    break;
                default:
                    travelMode = google.maps.TravelMode.DRIVING;
                    break;
            }

            directionsService.route({
                origin: currentLocation,
                destination: destination,
                travelMode: travelMode
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(response);
                } else {
                    alert("Directions request failed due to " + status);
                }
            });
        }, function () {
            alert("Error: The Geolocation service failed.");
        });
    } else {
        alert("Error: Your browser doesn't support geolocation.");
    }
}

function placeMarkersForContacts() {
    const rows = document.querySelectorAll('#grid-container table tbody tr');

    rows.forEach((row) => {
        const name = row.cells[0].textContent.trim(); 
        const location = row.cells[1].textContent.trim();
        const info = row.cells[2].textContent.trim();

        geocoder.geocode({ 'address': location }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                const latLng = results[0].geometry.location;
                
                const marker = new google.maps.Marker({
                    map: map,
                    position: latLng,
                    title: name 
                });

                markers.push(marker);

                const infoWindowContent = `
                    <div>
                        <strong>${name}</strong><br>
                        ${info}<br>
                        ${location}
                    </div>
                `;

                const infowindow1 = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                const infowindow2 = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                marker.addListener('mouseover', function () {
                    infowindow1.open(map, name);
                });

                marker.addListener('mouseout', function () {
                    infowindow1.close();
                });

                marker.addListener('click', function () {
                    infowindow2.open(map, marker);
                });

            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    });
}