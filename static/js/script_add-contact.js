var map;
var geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 44.9727, lng: -93.23540000000003 }
    });

    geocoder = new google.maps.Geocoder();

    addAutoComplete();

    const loc = document.getElementById('location');

    new ClickEventHandler(map, loc);
}

function isIconMouseEvent(e) {
    return "placeId" in e;
}

function addAutoComplete() {
    const input = document.getElementById('location');
    const autocomplete = new google.maps.places.Autocomplete(input);
}

class ClickEventHandler {
    map;
    loc;
    placesService;
    constructor(map, loc) {
        this.map = map;
        this.loc = loc;
        this.placesService = new google.maps.places.PlacesService(map);
        this.map.addListener("click", this.handleClick.bind(this));
    }

    handleClick(event) {
        if (isIconMouseEvent(event)) {
            event.stop();
            if (event.placeId) {
                this.placesService.getDetails({ placeId: event.placeId }, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        this.loc.value = place.formatted_address;
                    }
                });
            }
        }
    }
}