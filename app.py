# Dependencies
from flask import Flask, render_template, redirect, jsonify
from config import password, username

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
print(base)

# Choose the table we wish to use
state_parks_table = base.classes.state_parks
trails_table = base.classes.trails
park_visitors_table = base.classes.state_visitors


# Flask Server
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/parksData")
def parksData():
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
        dict["ParkVisitorCount_2015"] = ParkVisitorCount_2015
        dict["ParkPctChange_2015"] = ParkPctChange_2015
        dict["StateVisitorCount_2015"] = StateVisitorCount_2015
        dict["StatePctChange_2015"] = StatePctChange_2015
        dict["ParkVisitorCount_2014"] = ParkVisitorCount_2014
        dict["ParkPctChange_2014"] = ParkPctChange_2014
        dict["StateVisitorCount_2014"] = StateVisitorCount_2014
        dict["StatePctChange_2014"] = StatePctChange_2014
        parks.append(dict)
    return jsonify(parks)


@app.route("/trailData")
def trailData():
    session = Session(engine)
    results = session.query(trails_table.trail_id,
                            trails_table.name,
                            trails_table.area_name,
                            trails_table.state_name,
                            trails_table._geoloc,
                            trails_table.popularity,
                            trails_table.length,
                            trails_table.difficulty_rating,
                            trails_table.route_type,
                            trails_table.visitor_usage,
                            trails_table.avg_rating,
                            trails_table.activities,
                            trails_table.features).all()
    session.close()

    trails = []
    for trail_id, name, area_name, state_name, _geoloc, popularity, length, difficulty_rating, route_type, visitor_usage, avg_rating, activities, features in results:
        dict = {}
        dict["trail_id"] = trail_id
        dict["name"] = name
        dict["area_name"] = area_name
        dict["state_name"] = state_name
        dict["geoloc"] = _geoloc
        dict["popularity"] = popularity
        dict["length_yds"] = length
        dict["difficulty_rating"] =difficulty_rating
        dict["route_type"] = route_type
        dict["visitor_usage"] = visitor_usage
        dict["avg_rating"] = avg_rating
        dict["features"] = features
        dict["activities"] = activities
        trails.append(dict)
    return jsonify(trails)


@app.route("/visitorData")
def visitorData():
    session = Session(engine)
    results = session.query(park_visitors_table.State,
                            park_visitors_table.StateVisitorCount_2016,
                            park_visitors_table.StatePctChange_2016,
                            park_visitors_table.StateVisitorCount_2015,
                            park_visitors_table.StatePctChange_2015,
                            park_visitors_table.StateVisitorCount_2014,
                            park_visitors_table.StatePctChange_2014).all()
    session.close()

    visitors = []
    for State, StateVisitorCount_2016, StatePctChange_2016, StateVisitorCount_2015, StatePctChange_2015, \
        StateVisitorCount_2014, StatePctChange_2014 in results:
        dict = {}
        dict["State"] = State
        dict["StateVisitorCount_2016"] = StateVisitorCount_2016
        dict["StatePctChange_2016"] = StatePctChange_2016
        dict["StateVisitorCount_2015"] = StateVisitorCount_2015
        dict["StatePctChange_2015"] = StatePctChange_2015
        dict["StateVisitorCount_2014"] = StateVisitorCount_2014
        dict["StatePctChange_2014"] = StatePctChange_2014
        visitors.append(dict)
    return jsonify(visitors)



if __name__ == "__main__":
    app.run(debug=True)
