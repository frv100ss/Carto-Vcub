var GoogleMapsAPI = require('googlemaps');
var app = require('express')();
var	express = require('express');
var server = require('http').createServer(app);
var KMZGeoJSON = require('kmz-geojson');
var KMZUrl = "https://data.bordeaux-metropole.fr/files.php?gid=105&format=3";
    io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, data) {

	KMZGeoJSON.toKML(KMZUrl, function(err, kml) {
	  // Do something with the KML
	});

	KMZGeoJSON.toGeoJSON(KMZUrl, function(err, json) {
	  socket.emit('GeoJsonReady', {json : json});
	});   


	var publicConfig = {
	  key: 'AIzaSyC-YiFL0KzyOz04lQGfKD7j_eETfSUkQ3I',
	  stagger_time:       1000, // for elevationPath
	  encode_polylines:   false,
	  secure:             true, // use https

	};

	var gmAPI = new GoogleMapsAPI(publicConfig);

})

	app.use(express.static(__dirname + '/views'))
	    app.get('/cartoVel', function(req, res) { 
		res.render('index.html', {});
	})

var port = process.env.PORT || 3000;
server.listen(port);