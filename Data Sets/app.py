# Import the dependencies.
import numpy as np
import pandas as pd
import datetime as dt
from pathlib import Path
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, MetaData
from flask import Flask, jsonify
from datetime import datetime

engine = create_engine(f"sqlite:///Project_3.db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
crime = Base.classes.LA_Crime
# Create our session (link) from Python to the DB
session = Session(engine)

def parse_date(date_str):
    date_formats = ['%m/%d/%Y', '%m-%d-%Y', '%m-%d-%y']  # Add more formats if needed
    for date_format in date_formats:
        try:
            return datetime.strptime(date_str, date_format)
        except ValueError:
            continue
    return None  # Return None for unparseable dates

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def home():
    session = Session(engine)
    sel = [crime]
    result = session.query(*sel).all()

    data = []
    for row in result:
        row_dict = dict(row.__dict__)

        arrest_date_str = row_dict['Arrest_Date']
        if arrest_date_str is not None:
            parsed_date = parse_date(arrest_date_str)
            if parsed_date is not None:
                row_dict['Arrest_Date'] = parsed_date

        data.append(row_dict)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)