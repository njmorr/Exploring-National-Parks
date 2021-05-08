CREATE TABLE "state_parks" (
	"PK" varchar PRIMARY KEY,
	"State" varchar,
	"Park" varchar,
	"ParkVisitorCount_2016" FLOAT,
	"ParkPctChange_2016" FLOAT,
	"StateVisitorCount_2016" FLOAT,
	"StatePctChange_2016" FLOAT,
	"ParkVisitorCount_2015" FLOAT,
	"ParkPctChange_2015" FLOAT,
	"StateVisitorCount_2015" FLOAT,
	"StatePctChange_2015" FLOAT,
	"ParkVisitorCount_2014" FLOAT,
	"ParkPctChange_2014" FLOAT,
	"StateVisitorCount_2014" FLOAT,
	"StatePctChange_2014" FLOAT
);

select * from state_parks;

CREATE TABLE "trails" (
	"trail_id" INT,
	"name" varchar(50),
	"state_name" varchar(20), 
	"popularity" INT, 
	"length"  INT, 
	"difficulty_rating"  INT, 
	"visitor_usage"  INT, 
	"avg_rating"  INT
);