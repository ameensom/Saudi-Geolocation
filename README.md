Saudi GeoLocation Database
=======================

This is a refined copy of the Saudi Geolocation database taken from this repository
[usefksa-Saudi_GIS_Data](https://github.com/usefksa/Saudi_GIS_Data)
It was posted as an SQL database, with location and borders attribute for each district.
The location was an encoded polyline using Google Maps Polyline encoding, which after encoding returns an array of geolocation to set the borders of the intended district.
It can be viewed using phpMyAdmin , selecting a city then clicking on **Visualize GIS data**


## My Contribution
What I've done in this version is converting the database to JSON format and decoding the polyline to be an array contains group elements and each group has latitude and longitude keys.

I've also attached the script used to do the whole process.

Thank you
