console.log("logic.js loaded for chloropleth");
// Create the map object
var myMap = L.map("choropleth", {
    center: [48.3689, -103.77155634166667],
    zoom: 3
});

// Add tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// load in geojson data
// var geoData = "../../data/gz_2010_us_040_00_5m.json";
// var geojson;

// d3.json(geoData).then(function(data) {
    
//     geojson = L.chloropleth(geoData).addTo(myMap);

//     console.log("we got here... ");
// })

