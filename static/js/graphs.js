//Line graph for parks visitors
var labels = ("states", "visitor count");
var data = {
    labels = labels,
    datasets: [{
        label: "State",
        data: 0, //"StateParkData",
        fill: true,
        borderColor: 'rgb(0, 37, 45)', //same color as footer, okay to change
        tension: 0.1
    }]
};

var config = {
    type: 'line',
    data,
    options:{}
};

//Need to add to html, but not sure where to put it
{/* <script>
  // === include 'setup' then 'config' above ===

  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
</script> */}