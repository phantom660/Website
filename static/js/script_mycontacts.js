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

var map; // bject
var geocoder; // ect
var markers = []; // e markers

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 44.9727, lng: -93.23540000000003 }
    });

    geocoder = new google.maps.Geocoder();

    placeMarkersForContacts();
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

                const infowindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                marker.addListener('mouseover', function () {
                    infowindow.open(map, marker);
                });

                marker.addListener('mouseout', function () {
                    infowindow.close();
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    });
}