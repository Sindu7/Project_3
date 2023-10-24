//fetching the local site

// Perform a GET request to the query json file
d3.json("Data Sets/crime.json").then(function (stateData) {
    // Extract unique years from the data
    const uniqueYears = [...new Set(stateData.map(item => item.Year))];
    uniqueYears.sort((a, b) => a - b);

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
            width: 600,
            height: 600,
            aspectratio: {x:1, y: 1},
            legend: {
                x: 1.5,
                y: 0.5,
            },
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
        // Filter the data for the selected year
        let filteredData = stateData.filter(result => result.Year == sample);

        // Define age range increments
        const ageIncrements = [10, 20, 30, 40, 50, 60, 70, 80, 90];
        
        // Create an object to store counts for each age range
        const ageCounts = {};

        filteredData.forEach((data) => {
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

d3.json("Data Sets/crime.json").then(function(data) {
    const timeRange = data.map(obj => obj.Time_Range);
    // Call a function to create the counted table chart with the timeRange array
    function createCountedTableChart(timeRange) {
      const counts = {};
      timeRange.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
      });
      // Call a function to create the table chart with the counts
      function createTableChart(counts) {
        // Create a table element
        const table = document.createElement("table");
        // Create table header
        const headerRow = table.insertRow();
        const headerCell1 = headerRow.insertCell();
        const headerCell2 = headerRow.insertCell();
        headerCell1.textContent = "Time Range";
        headerCell2.textContent = "Count";
        // Populate the table with data
        for (const time in counts) {
          const row = table.insertRow();
          const cell1 = row.insertCell();
          const cell2 = row.insertCell();
          cell1.textContent = time;
          cell2.textContent = counts[time];
        }
        // Append the table to a container element
        const tableContainer = document.getElementById("table-container");
        tableContainer.innerHTML = ""; // Clear any existing content
        tableContainer.appendChild(table);
      }
      createTableChart(counts);
    }
    createCountedTableChart(timeRange);
  });