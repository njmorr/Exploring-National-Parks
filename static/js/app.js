// Test to see if the data loads properly
// console.log("the app.js file has loaded.")


//////////////////////////////////////////////////
// creates functions to draw the graphs/metadata

// bar graph
function drawBarGraph(sampleId) {
    // console.log(`drawBarGraph(${sampleId})`);

    // reads data into a function; creates variables for bar chart
    d3.json("data/samples.json").then(data => {
        // console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        // console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        // console.log(otu_labels);

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        // puts elements on bar chart into one variable
        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        // puts bar chart variable into an array
        var barArray = [barData];

        // set layout for bar chart
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        // plots bar chart
        Plotly.newPlot("bar", barArray, barLayout);
    });
}

// bubble Chart
function drawBubbleChart(sampleId) {
    // console.log(`drawBubbleChart(${sampleId})`);

    // reads data into a function; creates variables for bubble chart
    d3.json("data/samples.json").then(data => {
        // console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        // console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        // console.log(sample_values);

        // puts elements on bubble chart into one variable
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {size: sample_values,
                    color: otu_ids},
            text: otu_labels
        }

        // puts bubble chart variable into an array
        var bubbleArray = [bubbleData];

        // set layout for bubble chart
        var bubbleLayout = {
            title: "Bacteria Found in Bellybutton",
            margin: {t: 30, l: 150}
        }

        // plots bubble chart
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
        // documentation: https://plotly.com/javascript/bubble-charts/
        // accessed 30 April 2021
    });
}

// meta data
function showMetaData(sampleId) {
    // console.log(`showMetaData(${sampleId})`);

    // reads data into a function; creates variables for metadata list
    d3.json("data/samples.json").then(data => {
        // console.log(data);
        var metadata = data.metadata;
        var metadataArray = metadata.filter(s => s.id == sampleId)[0];
        var idee = metadataArray.id;
        var ethnicity = metadataArray.ethnicity;
        var gender = metadataArray.gender;
        var age = metadataArray.age;
        var location = metadataArray.location;
        var bbtype = metadataArray.bbtype;
        var wfreq = metadataArray.wfreq;
        // console.log(idee, ethnicity, gender, age, location, bbtype, wfreq);

        var metadataForSample = [{"id":idee, "ethnicity":ethnicity, "gender":gender, "age": age, "location":location, "bbtype":bbtype, "wfreq":wfreq}]
        // console.log(metadataForSample)

        var metaData = d3.select("#sample-metadata");

        metaData.html("");
        
        metaData.append("h6").text(`id: ${idee}`);
        metaData.append("h6").text(`ethnicity: ${ethnicity}`);
        metaData.append("h6").text(`gender: ${gender}`);
        metaData.append("h6").text(`age: ${age}`);
        metaData.append("h6").text(`location: ${location}`);
        metaData.append("h6").text(`bbtype: ${bbtype}`);
        metaData.append("h6").text(`wfreq: ${wfreq}`);
    
    });
}

// Washing Frequency Gauge
function showWashingGauge(sampleId) {

    // reads data into a function; creates variables for guage
    d3.json("data/samples.json").then(data => {
        // console.log(data);
        var metadata = data.metadata;
        var metadataArray = metadata.filter(s => s.id == sampleId)[0];
        var wfreq = metadataArray.wfreq;
        // console.log(wfreq);

        // puts elements into one variable
        var gaugeData = {
            domain: {x:[0,1], y:[0,1]},
            value: wfreq,
            title: {text:"Washings per Week"},
            type: "indicator",
            mode: "gauge+number",
            
            gauge: {
                axis: { range: [null, 9] },
                bar: {color: "cadetblue"},
                steps: [
                  { range: [0, 1], color: "ghostwhite", labels: "0-1" },
                  { range: [1, 2], color: "lightyellow" },
                  { range: [2, 3], color: "lemonchiffon" },
                  { range: [3, 4], color: "palegoldenrod" },
                  { range: [4, 5], color: "khaki" },
                  { range: [5, 6], color: "darkkhaki" },
                  { range: [6, 7], color: "olive" },
                  { range: [7, 8], color: "darkolivegreen" },
                  { range: [8, 9], color: "darkslategray" }
                ]
            }    
        }

        // puts gauge variable into an array
        var gaugeArray = [gaugeData];

        // set layout for gauge
        var gaugeLayout = {
            title: "Belly Button Washing Frequency",
            margin: {t: 30, l: 150},
            width: 600,
            height: 500
        }

        // plots gauge chart
        Plotly.newPlot("gauge", gaugeArray, gaugeLayout);
    
    });

   }


/////////////////////////////////////////////////////////
// function to handle changing of user input

function optionChanged (newSampleId) {
    // console.log(`user selected ${newSampleId}`);

    drawBarGraph(newSampleId);
    drawBubbleChart(newSampleId);
    showMetaData(newSampleId);
    showWashingGauge(newSampleId);   
}

/////////////////////////////////////////////////////
// initializing function

function initDashboard() {
    // console.log("initDashboard function called");

    // Populate the dropdown menu and draw populate inital graphs/data
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data){
        // console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId =>{
            selector.append("option")
            .text(sampleId)
            .property("value",sampleId);

        });

        var id = sampleNames[0];

        drawBarGraph(id);
        drawBubbleChart(id);
        showMetaData(id);
        showWashingGauge(id);

    });
}

initDashboard()


// portions of this code is based on Instructor Dom's offices hours on 14 April 2021