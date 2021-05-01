# Dependencies
from flask import Flask, render_template, redirect, jsonify
# from flask_pymongo import PyMongo

# # Import the functions we need from SQL Alchemy
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine

# # Define the database connection parameters
# username = 'postgres'  # Ideally this would come from config.py (or similar)
# password = 'postgresqladmin'  # Ideally this would come from config.py (or similar)
# database_name = 'GlobalFirePower' # Created in Week 9, Night 1, Exercise 08-Stu_CRUD 
# connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# # Connect to the database
# engine = create_engine(connection_string)
# base = automap_base()
# base.prepare(engine, reflect=True)

# TO DO - Choose the table we wish to use 
# table = base.classes.firepowe


# Flask Server
app = Flask(__name__)


# Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/phone_app"
# mongo = PyMongo(app)

@app.route("/")
def index():
    test = "we did it!"
    # return render_template("index.html", listings=test)
    return test

# @app.route("/data")
# def scraper():
#     listings = mongo.db.listings
#     listings_data = scrape_mars.scrape()
#     listings.update({}, listings_data, upsert=True)
#     return redirect("/", code=302)

# @app.route("/about")
# def scraper():
#     listings = mongo.db.listings


if __name__ == "__main__":
    app.run(debug=True)