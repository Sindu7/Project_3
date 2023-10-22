# Project_3

Project Proposal
1.	 We will be creating a geo map of crime data in LA. The map can be filtered by the following categories to give the user more detailed information on a specific group of people. The data we used was specific to charge 41.18 SITTING, LYING, OR SLEEPING OR STORING, USING, MAINTAINING, OR PLACING PERSONAL PROPERTY IN THE PUBLIC RIGHT-OF-WAY.
a.	Race
b.	Year
c.	Arrest Type (misdemeanor / infraction / other)
d.	Age
e.	Sex
f.	Time (seasons of the year)

2.	Java Script Libraries
a.	Chart.js
b.	Plotly.js
c.	Leaflet 
d.	Victory re-charts
e.	Cross filter

3.	Basic Outline of Using Libraries Together 
a.	Set Up Leaflet and Heatmap.js:  Initialize Leaflet to create the base map. Integrate Heatmap.js to add heat map functionality. Load Data and Create Heat Map:  Load your data (e.g., coordinates with intensity values). Use Heatmap.js to generate the heat map layer based on your data. Add Popups:  Use Leaflet's built-in popup functionality to display additional information when a user interacts with a data point on the map. Implement Filters:  Create custom UI elements (buttons, dropdowns, etc.) using Leaflet's controls to allow users to filter the data displayed on the map 

Questions to Answer:
The purpose of this map and additional data visuals is to provide the user with relevant and accurate information on the homless population in LA. The map can provide year over year data from 2012 through 2023 on the type of arrest, time of arrest, age, race, gender, and location of the arrested. A heat map was created to give the user easy access and a visual representation on the arrested while a pie chart and bar graph provide other metrics described above. 

Initially, a flask API was created to power the dashboard, but ufortunately that did not work as expected. Instead we created a json file and used that to power our heat map and other visuals.

Conclusions:
Arrests have decreased from 2012 to now. With the year 2012 having over 4000 arrests, the past year had only 853.

The majority of the homeless population was black until 2018, while 2019 and on were primarily white.

While news outlets and online data show that the homeless situation in CA is growing year over year. Our data shows that the arrests have been decreasing over the past 10 years. This can be a sign of lack of enforcement and less strict laws in CA which are very appealing to homeless peeople in other states. 