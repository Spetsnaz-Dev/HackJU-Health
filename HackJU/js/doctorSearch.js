
var lat=0, lon=0;

$(document).ready( function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });
    } else {
        console.log("Geolocation is not supported by this browser.Use Updated Browser to use this app!");
    }
});

var api_key = '36d21e87d3d6db83f7af53450608b834';
var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key='
                        + api_key;


$.get(resource_url, function (data) {
    // data: { meta: {<metadata>}, data: {<array[Practice]>} }
    var template = Handlebars.compile(document.getElementById('docs-template').innerHTML);
    console.log(template(data));
    document.getElementById('content-placeholder').innerHTML = template(data);
});