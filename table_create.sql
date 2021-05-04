CREATE TABLE "state_parks" (
	"year" INT,
	"state" varchar(20),
	"park" varchar(50),
	"park_visitor_count" INT,
	"park_pct_change" varchar(10),
	"state_visitor_count" INT,
	"state_pct_change" varchar(10)
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
),