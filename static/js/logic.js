console.log("logic.js");


var myMap = L.map('choropleth').setView([48.3689, -103.77155634166667], 4);

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


var lookupVisitorCount = {
    // stateName: visitorCount
};


var colors = ['#BB3E03', '#005f73', '#94D2BD', '#CA6702', '#EE9B00', '#0A9396', '#9B2226', '#E9D8A6'];

d3.json(geoData).then(function (data, err) {
    if (err) throw err;

    d3.json('/visitorData').then(visitors => {


        // visitors has meaning only inside of here.
        // And for very bizarre reasons, you can't assign it
        // to anything else.
        console.log('showing visitors');
        console.log(visitors);
        console.log('showing data');
        console.log(data);

        // Populate stateVisitorcount with a key-value pair for each state
        visitors.forEach(v => {
            var stateName = v.State;
            if (!(stateName in lookupVisitorCount)) {
                lookupVisitorCount[stateName] = v.StateVisitorCount_2014;
            }
        });

        console.log("Showing lookupVisitorCount");
        console.log(lookupVisitorCount);
        console.log(`this is Data:`);
        console.log(data);

        // The data parameters holds a geoJSON
        var geo = L.geoJson(data, {

            valueProperty: lookupVisitorCount[data.features[2].properties.NAME],
            // test: data.features[2].properties.NAME,
            // Set color scale
            scale: ["#9B2226", "#E9D8A6"],
            // scale: ["#ffffb2", "#b10026"],

            // Number of breaks in step range
            steps: 8,

            // q for quartile, e for equidistant, k for k-means
            mode: "q",
            // style: {
            //     // Border color
            //     color: "#BB3E03",
            //     weight: 1,
            //     fillOpacity: 0.8
            // },
            style: style(lookupVisitorCount[data.features[2].properties.NAME]),

            // This operates on ALL states (from the geoJSON)
            onEachFeature: function (feature, layer) {

                var stateName = feature.properties.NAME;
                var stateData = visitors.filter(d => d.State === stateName);

                var numVisitors = 0;
                if (stateData.length > 0) {
                    numVisitors = stateData[0].StateVisitorCount_2014;
                }

                // console.log(`stateName = ${stateName}`);
                // console.log('stateData');
                // console.log(stateData); 
                // console.log(`numVisitors = ${numVisitors}`); 

                layer.bindPopup(`${stateName} <br> Visitors: ${numVisitors}`);

                // Set mouse events to change map styling
                layer.on({
                    // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
                    mouseover: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                    },
                    // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
                    mouseout: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.5
                        });
                    },
                    // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
                    click: function (event) {
                        myMap.fitBounds(event.target.getBounds());
                    }
                });

                layer.on('click', function () { 
                    alert(`You clicked ${stateName}`); 
                });

            }

        }).addTo(myMap);
        console.log(geo);
    });

    console.log("we got here... ");
}).catch(function (error) {
    console.log(error);
});

function getStateVisitors(stateName) {
    d3.json('/visitorData').then(visitors => {
        var stateData = visitors.filter(d => d.State === stateName);
        var visitorsCount = stateData.StateVisitorCount_2014;
        console.log(`state: ${stateName} visitors: $(visitorsCount}`);
    });


}

function getColor(d) {
    var colors = ['#BB3E03', '#005f73', '#94D2BD', '#CA6702', '#EE9B00', '#0A9396', '#9B2226', '#E9D8A6'];
    console.log(`getColor: ${d}`);
    return d > 10000000 ? colors[0] :
        d > 1000000 ? colors[1] :
            d > 500000 ? colors[2] :
                d > 250000 ? colors[3] :
                    d > 100000 ? colors[4] :
                        d > 50000 ? colors[5] :
                            d > 10000 ? colors[6] :
                                colors[7];
}

function style(visitorsCount) {
    console.log(`style method: ${visitorsCount}`);
    return {
        fillColor: getColor(visitorsCount),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


// function createLinegraph(state) {
console.log(`let's go into the line graph`)


function createLinegraph(state) {
    d3.json("/parksData").then(parks => {
        // state to be selected based on choropleth click
        var selected_state = state
        // console.log("selected state " + selected_state);

        var resultArray = parks.filter(p => p.State == selected_state);
        // console.log("resultArray" + JSON.stringify(resultArray));

        var labels = [2014, 2015, 2016];
        var chartData = []

        var colors = ["#001219", "#005f73", "#0a9396", "#94d2bd", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226",
            "#001219", "#005f73", "#0a9396", "#94d2bd", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226",
            "#001219", "#005f73", "#0a9396", "#94d2bd", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"];


        for (var i = 0; i < resultArray.length; i++) {
            park_name = resultArray[i].Park;

            visitor_2014 = resultArray[i].ParkVisitorCount_2014;
            visitor_2015 = resultArray[i].ParkVisitorCount_2015;
            visitor_2016 = resultArray[i].ParkVisitorCount_2016;
            color = colors[i]

            var parkDataForChart = { "label": park_name, "lineTension": 0.5, "borderWidth": 2, "borderColor": "white", "backgroundColor": color, "data": [visitor_2014, visitor_2015, visitor_2016] };
            chartData.push(parkDataForChart);
        }

        // console.log(parkNames);
        // console.log(parkVisitors);
        // console.log(chartData);

        const data = {
            labels: labels,
            datasets: chartData
        };

        var config = {
            type: 'line',
            data: data,
            options: {}
        }

        var myLineChart = new Chart(
            document.getElementById('lineChart'),
            config
        );

    }

    )
}

console.log(`let's go into the bubble chart`)

function createBubblechart(state) {
    d3.json('/trailData').then(trailData => {

        // console.log("inside trailData");
        // console.log(trailData);

        var selected_state = state
        // console.log("selected state " + selected_state);
        var resultArray = trailData.filter(s => s.state_name == selected_state);

        // console.log("resultArray" + JSON.stringify(resultArray));

        var trail_difficulty_rating = [];
        var trail_avg_rating = [];
        var trail_length = [];
        var trail_popularity = [];
        var trail_hover_text = [];

        resultArray.forEach(trail => {
            trail_difficulty_rating.push(trail.difficulty_rating * 7);
            trail_avg_rating.push(trail.avg_rating);
            trail_length.push(trail.length_yds);
            trail_popularity.push(trail.popularity);
            trail_hover_text.push('Trail Name: ' + trail.name +
                '<br>Area Name:' + trail.area_name +
                '<br>Difficulty Rating:' + trail.difficulty_rating +
                '<br>Avg Rating:' + trail.avg_rating);

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
            title: "Trail Comparison",
            showlegend: false,
            autosize: true,
            height: 400,
            width: 600,
            xaxis: {
                title: "trail length"
            },
            yaxis: {
                title: "trail popularity"
            }

        };


        Plotly.newPlot('bubble', bubbleArray, bubbleLayout);
        //})






        //console.log(trailData[0]);

    });
}

// function createLegend(state) {
// // for
// }


function init() {
    var state = "Minnesota"

    createLinegraph(state);
    createBubblechart(state);

};

init();




// function updateDashboard() {
//     var =jhk;

//     createLinegraph(updatedState);
//     createBubblechart(updatedState);
//     createLegend(updatedState);
// }

// // respond to the user input on the Dashboard
// function onChange() {
//     //find the input
//     var stateSelected = ""; // TBD gather the input here

//     // updateDashboard with the state selected
//     updateDashboard(stateSelected);
// }

//  Initial Dashboard
//init();
