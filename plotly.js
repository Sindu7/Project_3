//fetching the local site

// Perform a GET request to the query json file
d3.json("Data Sets/crime.json").then(function (stateData) {
    // Extract unique years from the data
    const uniqueYears = [...new Set(stateData.map(item => item.Year))];
    
    // Populate the dropdown with unique years
    const dropdown = d3.select('#selDataset');
    
    uniqueYears.forEach((year) => {
        const option = dropdown.append('option');
        option.attr('value', year);
        option.text(`${year}`);
    });
});



function buildPieChart(sample) {
    
    d3.json("Data Sets/crime.json").then((stateData) => {

        let filteredData = stateData.filter(result => result.Year == sample)

        const raceCounts = {};

        filteredData.forEach((data) => {
            const raceType = data["Race"];
            if (raceCounts[raceType]) {
                raceCounts[raceType]++;
            } else {
                raceCounts[raceType] = 1;
            }
        });
    
        const raceTypes = Object.keys(raceCounts);
        const counts = Object.values(raceCounts);
        const totalArrests = counts.reduce((acc, curr) => acc + curr, 0); // Calculate total arrests

        const data = [{
            labels: raceTypes,
            values: counts,
            type: 'pie'
        }];

        const layout = {
            title: `Race Distribution for Year ${sample}`,
        };

        Plotly.newPlot('pie-chart', data, layout);

        // Display total arrests
        const totalArrestsElement = d3.select('#total-arrests');
        totalArrestsElement.text(`Total Arrests: ${totalArrests}`);
    });
} 

// Define the optionChanged function
function optionChanged(selectedYear) {
    // Value is the selected number of arrests, do something with it
    console.log('Selected arrests:', selectedYear);
    buildPieChart(selectedYear)
}