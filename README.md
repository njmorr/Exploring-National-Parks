# Exploring National Parks

### Introduction
Welcome to our exploration into the National Park system in the United States.  Most people think of the National Park System as only containing the National Parks (of which there are 61), but there are many different types of lands that fall under the jurisdiction of the National Park Service.  For instance, when interacting with dashboard, you may see these abbreviations: <br>
* NB (National Battlefield)
* NHP (National Historical Park)
* NHS (National Historic Site)
* NL (National Lakeshore)
* NM (National Monument)
* NMP (National Military Park)
* NPRES (National Preserve)
* NR (National River)
* NRA (National Recreation Area)
* NS (National Seashore)
* PKWY (National Parkway)

### How it Works
State-related data for Minnesota will be appear when the dashboard is first loaded.  Click on any of the states to dig a bit deeper to what the National Park Service has to offer in that area.
Some things to note:
* Delaware is the only state in the US without a National Lands
* California has the most trails and the most National Lands
* The trail data (bubble chart) only includes information for 30 states 

### Things We Learned
Notes on things we learned about doing this project 

### Instructions
#### Getting Started
1. Go to our shared repo: [National Parks Repo](https://github.com/njmorr/Exploring-National-Parks) 
1. Clone repo to location of your choosing
1. Create `config.py` in the main directory and populate with:
    * `username = “your_postgres_username”`
    * `password = “your_postgres_password”`
1. Create `config.js` in the subfolder `static/js` with
	* `const API_KEY = “your_mapbox_API_key_here”`

#### Setting up the Database
1. Launch pgAdmin
1. Create a new database called `national_park_db`
1. Open `query tools` and open `table_create.sql` located in the main directory
1. Run `table_create.sql` to create three tables one-by-one
	* `state_parks`
	* `state_visitors`
	* `trails`
1. Query each table individually and inspect to ensure the first column is noted at as a Primary Key and no data is in the table

#### Populate the Database
1. Launch the jupyter notebook file `NationalParkData.ipynb` located in the main directory
1. Run `NationalParkData.ipynb` in its entirety
1. Return to pgAdmin and query each table individually to verify each table was populated correctly

#### Launch Application
1. Launch a new gitbash window (pc) or terminal (mac) from the main directory
1. enter the following commands.
	* `source activate PythonData`
	* `python app.py`
1. Launch a new Chrome browser session and enter the URL `127.0.0.1:5000`
1. Congratulations! You can now explore the national parks in more depth.





