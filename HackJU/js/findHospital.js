
//var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var Icn;

$(document).ready( function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            initialize();
        });
    } else {
        console.log("Geolocation is not supported by this browser.Use Updated Browser to use this app!");
    }
});

var map;
var infowindow;

function initialize() {
    var pyrmont = new google.maps.LatLng(lat, lon); // sample location to start with: Mumbai, India

    map = new google.maps.Map(document.getElementById('display'), {
        center: pyrmont,
        zoom: 15
    });

    var request = {
        location: pyrmont,
        radius: 200,
        types: ['hospital', 'health'] // this is where you set the map to get the hospitals and health related places
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}


google.maps.event.addDomListener(window, 'load', initialize);