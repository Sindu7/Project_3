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
    buildBarChart(selectedYear)
}

function buildBarChart(sample) {
    d3.json("Data Sets/crime.json").then((stateData) => {
        // Define age range increments
        const ageIncrements = [10, 20, 30, 40, 50, 60, 70, 80, 90];
        
        // Create an object to store counts for each age range
        const ageCounts = {};

        stateData.forEach((data) => {
            const age = data["Age"];
            // Find the appropriate age range for the current age
            const ageRange = ageIncrements.find(increment => age >= increment && age < increment + 10);
            
            if (ageRange) {
                if (ageCounts[ageRange]) {
                    ageCounts[ageRange]++;
                } else {
                    ageCounts[ageRange] = 1;
                }
            }
        });

        const ageRanges = ageIncrements.map(increment => `${increment}-${increment + 9}`);
        const counts = ageIncrements.map(increment => ageCounts[increment] || 0);

        const data = [{
            x: ageRanges,
            y: counts,
            type: 'bar'
        }];

        const layout = {
            title: `Age Range Distribution for Year ${sample}`,
            xaxis: {
                title: 'Age Ranges'
            },
            yaxis: {
                title: 'Arrest Counts'
            }
        };

        Plotly.newPlot('bar-chart', data, layout);
    });
}
