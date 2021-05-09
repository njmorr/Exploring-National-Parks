console.log("logic.js");
// var parks
// var visitorData
// var trailData

d3.json('/visitorData').then(visitorData => {

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
d3.json('/trailData').then(trailData => {
 
        console.log("inside trailData");
        console.log(trailData);

            
            var selected_state = "Florida"
            console.log("selected state " + selected_state);
            var resultArray = trailData.filter(s => s.state_name == selected_state);
            
            console.log("resultArray" + JSON.stringify(resultArray));
                
            var trail_difficulty_rating = [];
            var trail_avg_rating = [];
            var trail_length = [];
            var trail_popularity = [];
            var trail_hover_text = [];

            resultArray.forEach(trail => {
                trail_difficulty_rating.push(trail.difficulty_rating*7);
                trail_avg_rating.push(trail.avg_rating);
                trail_length.push(trail.length_yds);
                trail_popularity.push(trail.popularity);
                trail_hover_text.push('Trail Name: ' + trail.name + '<br>Avg Rating:' + trail.avg_rating);
                
            });
    
            // console.log("trail raiting: " + trail_avg_rating);
            // console.log("trail length: " + trail_length);
            // console.log("trail popularity: " + trail_popularity);
    
            
    
            var bubbleData = {
                x: trail_length,
                //y: trail_difficulty_rating,
                y: trail_popularity,
                text: trail_hover_text,
                //to remove the y axis number in the hover
                hovertemplate: '%{text}',
                mode: 'markers',
                marker: {
                    color: trail_avg_rating,
                    //size: trail_popularity (update at top * 10)
                    size: trail_difficulty_rating
                }
            };

            var bubbleArray = [bubbleData];
    
            var bubbleLayout = {
                title: "Trail Bubble Chart",
                showlegend:false,
                height: 400,
                width: 600,
                xaxis: {
                    title: "trail length"    
                },
                yaxis: {
                    title: "trail popularity"    
                },
                
                
            };
    
            Plotly.newPlot('bubble', bubbleArray, bubbleLayout);
        //})






        //console.log(trailData[0]);
    
});
// }

// function createLegend(state) {
// // for
// }


// function init() {

//     createChoropleth();

// }


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
