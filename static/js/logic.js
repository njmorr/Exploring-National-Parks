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
// var geoData = "../static/data/gz_2010_us_040_00_5m.json";
var geoData = '../static/data/parks_geojson.js';

var lookupVisitorCount = {
    // stateName: visitorCount
};

// var colors = ['#BB3E03', '#005f73', '#94D2BD', '#CA6702', '#EE9B00', '#0A9396', '#9B2226', '#E9D8A6'];
// var colors = ['#BB3E03', '#CA6702', '#EE9B00', '#E9D8A6', '#005f73', '#0A9396', '#94D2BD', '#9B2226'];

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
        // visitors.forEach(v => {
        //     var stateName = v.State;
        //     if (!(stateName in lookupVisitorCount)) {
        //         lookupVisitorCount[stateName] = v.StateVisitorCount_2016;
        //     }
        // });

        console.log("Showing lookupVisitorCount");
        console.log(lookupVisitorCount);
        console.log(`this is Data:`);
        console.log(data);

        // The data parameters holds a geoJSON
        var geo = L.geoJson(data, {

            style: function (feature) {
                return {
                    color: "white",
                    fillColor: getColor(feature.properties.StateVisitorCount_2016),
                    fillOpacity: 0.5,
                    weight: 1.5
                };
            },

            // This is like a forEach loop that operates on each state (from the geoJSON)
            onEachFeature: function (feature, layer) {

                var stateName = feature.properties.NAME;
                var stateData = visitors.filter(d => d.State === stateName);

                var numVisitors = 0;
                if (stateData.length > 0) {
                    numVisitors = stateData[0].StateVisitorCount_2016;
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
                    // click: function (event) {
                    //     myMap.fitBounds(event.target.getBounds());
                    // }
                });

                layer.on('click', function () {
                    createLinegraph(stateName);
                    createBubblechart(stateName);
                });

            }

        }).addTo(myMap);
        var legend = L.control({ position: 'bottomright' });

        legend.onAdd = function (myMap) {

            var div = L.DomUtil.create('div', 'info legend'),
                visitors = [0, 10000, 50000, 100000, 250000, 500000, 1000000, 10000000],
                labels = colors;

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < visitors.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(visitors[i] + 1) + '"></i> ' +
                    visitors[i] + (visitors[i + 1] ? '&ndash;' + visitors[i + 1] + '<br>' : '+');
            }

            return div;
        };

        legend.addTo(myMap);
    });

    console.log("we got here... ");
}).catch(function (error) {
    console.log(error);
});

function getStateVisitors(stateName) {
    d3.json('/visitorData').then(visitors => {
        var stateData = visitors.filter(d => d.State === stateName);
        var visitorsCount = stateData.StateVisitorCount_2016;
        console.log(`state: ${stateName} visitors: $(visitorsCount}`);
    });


}
var colors = ['#9B2226', '#BB3E03', '#CA6702', '#EE9B00', '#E9D8A6', '#94D2BD', '#0A9396', '#005f73'];

function getColor(d) {
    
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
        fillOpacity: 0.5
    };
}


// function createLinegraph(state) {
console.log(`let's go into the line graph`)



function createLinegraph(state) {
    d3.json("/parksData").then(parks => {
        // clearing out the line chart before redrawing it again, if it already exsists.
        if (typeof window.myLineChart != "undefined") {
            console.log("myLineChart is defined!! and should be destroyed!")
            window.myLineChart.destroy();
        } else {
            console.log("variable has yet to be defined.")
        };

        // "destroying" line plot area
        // https://github.com/chartjs/Chart.js/issues/1007
        // accessed 10 May 2021

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
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `Visitor Counts by Year per Park in ${selected_state}`,
                        font: {
                            size: 16
                        }
                    }
                },
                scales: {
                    x: [{
                        title: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    y: [{
                        title: {
                            display: true,
                            labelString: 'Visitor Count'
                        }
                    }]
                }
            }
        };

        window.myLineChart = new Chart(
            document.getElementById('lineChart'),
            config
        );

    });
};


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
            trail_difficulty_rating.push(trail.difficulty_rating * 10);
            trail_avg_rating.push(trail.avg_rating);
            trail_length.push(trail.length_yds / 1760);
            trail_popularity.push(trail.popularity);
            trail_hover_text.push('Trail Name: ' + trail.name +
                '<br>Park Name: ' + trail.area_name +
                '<br>Difficulty Rating: ' + trail.difficulty_rating +
                '<br>Avg Rating: ' + trail.avg_rating);

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
            title: `Comparison of Trails in ${selected_state}`,
            showlegend: false,
            autosize: true,
            height: 300,
            width: 545,
            xaxis: {
                title: "Trail Length (miles)"
            },
            yaxis: {
                title: "Trail Popularity"
            },
            paper_bgcolor:"#E9D8A6",
            plot_bgcolor:"#E9D8A6"
        };


        Plotly.newPlot('bubble', bubbleArray, bubbleLayout);

        //console.log(trailData[0]);

    });
}



function init() {
    var state = "Minnesota"

    createLinegraph(state);
    createBubblechart(state);

};

init();
