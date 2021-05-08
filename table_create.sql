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
	"trail_id" int PRIMARY KEY,
	"name" varchar,
	"area_name" varchar,
	"state_name" varchar, 
	"_geoloc" varchar,
	"popularity" FLOAT, 
	"length"  FLOAT, 
	"difficulty_rating"  INT, 
	"route_type" varchar,
	"visitor_usage"  FLOAT, 
	"avg_rating"  FLOAT,
	"features" varchar,
	"activities" varchar
);

select * from trails;

CREATE TABLE "state_visitors" (
	"State" varchar PRIMARY KEY,
	"StateVisitorCount_2016" FLOAT,
	"StatePctChange_2016" FLOAT,
	"StateVisitorCount_2015" FLOAT,
	"StatePctChange_2015" FLOAT,
	"StateVisitorCount_2014" FLOAT,
	"StatePctChange_2014" FLOAT
);

select * from state_visitors;
