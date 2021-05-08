# Dependencies
from flask import Flask, render_template, redirect, jsonify
from config import password, username
# from flask_pymongo import PyMongo

# # Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# # Define the database connection parameters
# username = 'postgres'
# password = 'postgresqladmin'
database_name = 'national_park_db'
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# # Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)
# print(base)

# Choose the table we wish to use
state_parks_table = base.classes.state_parks
# trails_table = base.classes.trails


# Flask Server
app = Flask(__name__)


@app.route("/")
def index():

    session = Session(engine)
    results = session.query(state_parks_table.PK).all()
    session.close()
    return render_template('index.html')
    return results


@app.route("/data")
def data():
    session = Session(engine)
    results = session.query(state_parks_table.PK,
                            state_parks_table.State,
                            state_parks_table.Park,
                            state_parks_table.ParkVisitorCount_2016,
                            state_parks_table.ParkPctChange_2016,
                            state_parks_table.StateVisitorCount_2016,
                            state_parks_table.StatePctChange_2016,
                            state_parks_table.ParkVisitorCount_2015,
                            state_parks_table.ParkPctChange_2015,
                            state_parks_table.StateVisitorCount_2015,
                            state_parks_table.StatePctChange_2015,
                            state_parks_table.ParkVisitorCount_2014,
                            state_parks_table.ParkPctChange_2014,
                            state_parks_table.StateVisitorCount_2014,
                            state_parks_table.StatePctChange_2014).all()
    session.close()

    parks = []
    for PK, State, Park, \
        ParkVisitorCount_2016, ParkPctChange_2016, StateVisitorCount_2016, StatePctChange_2016, \
        ParkVisitorCount_2015, ParkPctChange_2015, StateVisitorCount_2015, StatePctChange_2015, \
        ParkVisitorCount_2014, ParkPctChange_2014, StateVisitorCount_2014, StatePctChange_2014 in results:
        dict = {}
        dict["PK"] = PK
        dict["State"] = State
        dict["Park"] = Park
        dict["ParkVisitorCount_2016"] = ParkVisitorCount_2016
        dict["ParkPctChange_2016"] = ParkPctChange_2016
        dict["StateVisitorCount_2016"] = StateVisitorCount_2016
        dict["StatePctChange_2016"] = StatePctChange_2016
        dict["ParkVisitorCount_2015"] = ParkVisitorCount_2016
        dict["ParkPctChange_2015"] = ParkPctChange_2016
        dict["StateVisitorCount_2015"] = StateVisitorCount_2016
        dict["StatePctChange_2015"] = StatePctChange_2016
        dict["ParkVisitorCount_2014"] = ParkVisitorCount_2016
        dict["ParkPctChange_2014"] = ParkPctChange_2016
        dict["StateVisitorCount_2014"] = StateVisitorCount_2016
        dict["StatePctChange_2014"] = StatePctChange_2016
        parks.append(dict)
    return jsonify(parks)


if __name__ == "__main__":
    app.run(debug=True)
