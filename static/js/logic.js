console.log("logic.js");
// var parks
// var visitorData
// var trailData

d3.json('/data').then(visitorData => {

    // parks has meaning only inside of here.
    // And for very bizarre reasons, you can't assign it
    // to anything else.

    console.log(visitorData);





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
    var geoData = "../static/data/gz_2010_us_040_00_5m.json";

    var geoJson;




    d3.json(geoData).then(function (data, err) {
        if (err) throw err;

        console.log(data);
        geoJson = L.choropleth(data, {
            valueProperty: "NAME",

            // Set color scale
            scale: ["#ffffb2", "#b10026"],

            // Number of breaks in step range
            steps: 10,

            // q for quartile, e for equidistant, k for k-means
            mode: "q",
            style: {
                // Border color
                color: "#fff",
                weight: 1,
                fillOpacity: 0.8
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.NAME);
            }

        }).addTo(myMap);


        console.log("we got here... ");
    }).catch(function (error) {
        console.log(error);
    });
});

// function createLinegraph(state) {

// }

// function createBubblechart(state) {


// }

// function createLegend(state) {
// // for
// }


function init() {

    createChoropleth();

}


// function updateDashboard(state) {
//     createLinegraph(state);
//     createBubblechart(state);
//     createLegend(state);
// }

// // respond to the user input on the Dashboard
// function onChange() {
//     //find the input
//     var stateSelected = ""; // TBD gather the input here

//     // updateDashboard with the state selected
//     updateDashboard(stateSelected);
// }

//  Initial Dashboard
init();
