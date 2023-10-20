//fetching the local site

// Perform a GET request to the query json file
d3.json("Data Sets/crime.json").then(function (stateData) {
    // Process the Data
    const yearCounts = d3.rollup(stateData, v => v.length, d => d.Year);

    // Get years and counts
    const years = Array.from(yearCounts.keys());
    const counts = Array.from(yearCounts.values());

    // Populate the dropdown
    const dropdown = d3.select('#selDataset');

    years.forEach((year, index) => {
        const option = dropdown.append('option');
        option.attr('value', counts[index]);
        option.text(`${year} (${counts[index]} arrests)`);
    });
});

// Define the optionChanged function
function optionChanged(value) {
    // Value is the selected number of arrests, do something with it
    console.log('Selected arrests:', value);
}

