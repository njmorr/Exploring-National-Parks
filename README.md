Exploring National Parks

  
In the main EXPLORING-NATIONAL-PARKS folder create a config.py with your postgres password and username
          o  Password = yourpassword inside of “”
          o  username = “postgres”
·        In pgAdmin right click on Databases then Create --> Database and name it national_park_db
·        In pgAdmin right click on the “national_park_db” and select “query tool”
          o  Open the folder and select the table_create.sql run to create the following tables
                    1.      state_parks
                    2.      trails
                    3.      state_visitors
·        open a gitBash window
          o  type “source activate PythonData”
          o  to launch type “jupyter notebook”
          o  open and run “NationalParkData.ipymb” to populate the tables
·        go back into pgAdmin and verify the data has been loaded into the tables