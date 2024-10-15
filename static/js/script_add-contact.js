var map;

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 44.9727, lng: -93.23540000000003 }
    });
    
    addAutoComplete();
}

function addAutoComplete() {
    const input = document.getElementById('addressTextField');
    const autocomplete = new google.maps.places.Autocomplete(input);
}