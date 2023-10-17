# Import the dependencies.
import numpy as np
import pandas as pd
import datetime as dt
import csv
from pathlib import Path
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, MetaData
from flask import Flask, jsonify
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)

# Allow requests from all origins (you can specify specific origins)
CORS(app, resources={r"/api/*": {"origins": "*"}})

data = []

with open("41.18_Arrests_2013_-_2023.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)

    for row in csv_reader:
        skip_row = False
        
        # Check if any value in the row is "#N/A", and if so, skip the row
        if '#N/A' in row.values():
            skip_row = True

        if not skip_row:
            Report_ID = int(row['Report_ID'])
            Report_Type = str(row['Report_Type'])
            Year = int(row['Year'])
        
            Arrest_Date = None
            try:
                Arrest_Date = datetime.strptime(row['Arrest_Date'], '%m/%d/%Y')
            except ValueError:
                try:
                    Arrest_Date = datetime.strptime(row['Arrest_Date'], '%Y-%m-%d')
                except ValueError:
                    pass
        
            if row['Time']:
                Time = int(row['Time'])
            else:
                Time = None
        
            Time_Range = str(row['Time_Range'])
            Area_Name = str(row['Area_Name'])
            Reporting_District = int(row['Reporting_District'])
            Age = int(row['Age'])
            Sex = str(row['Sex'])
            Race = str(row['Race'])
            Charge_Group_Description = str(row['Charge_Group_Description'])
            Arrest_Type = str(row['Arrest_Type'])
            Charge = str(row['Charge'])
            Charge_Description = str(row['Charge_Description'])
            Disposition_Description = str(row['Disposition_Description'])
            Address = str(row['Address'])
            Cross_Street = str(row['Cross_Street'])
            LAT = float(row['LAT'])
            LON = float(row['LON'])
            CD = str(row['CD'])

            data.append(row)

# create Flask API
app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)