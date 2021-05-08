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
print(base)

# Choose the table we wish to use 
# state_parks_table = base.classes.national_park_db
trails_table = base.classes.trails


# Flask Server
app = Flask(__name__)

@app.route("/")
def index():
    print(trails_table.area_name[0])
    return render_template('index.html')
    

if __name__ == "__main__":
    app.run(debug=True)