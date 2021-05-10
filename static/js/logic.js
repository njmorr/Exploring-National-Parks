console.log("logic.js");


var  myMap = L.map('choropleth').setView([48.3689, -103.77155634166667], 4);

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


var colors = ['#BB3E03','#005f73','#94D2BD','#CA6702','#EE9B00','#0A9396','#9B2226','#E9D8A6'];

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


        // The data parameters holds a geoJSON
        var geo = L.geoJson(data, {
            
            valueProperty: lookupVisitorCount[data.NAME], 

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
            style: style( lookupVisitorCount[data.NAME] ),
            
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
    var colors = ['#BB3E03','#005f73','#94D2BD','#CA6702','#EE9B00','#0A9396','#9B2226','#E9D8A6'];
    console.log(`getColor: ${d}`);
    return  d > 10000000 ? colors[0]:
            d > 1000000 ? colors[1]:
            d > 500000 ? colors[2]:
            d > 250000 ? colors[3]:
            d > 100000 ? colors[4]:
            d > 50000 ? colors[5]:
            d > 10000 ? colors[6]:
                        colors[7];
}

function style(visitorsCount) {
    console.log(`style method: ${visitorsCount}`);
    return {
            fillColor: getColor(visitorsCount),
            weight: 2,
            opacity: 1,
            color:'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
}


// function createLinegraph(state) {

// }

// function createBubblechart(state) {


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
//init();
