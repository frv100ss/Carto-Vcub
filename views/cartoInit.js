function initialize() {

    var mapOptions = {
          center: new google.maps.LatLng(44.833328, -0.56667),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };


		var map = new google.maps.Map(document.getElementById("map_canevas"),
		mapOptions);
 
    var socket = io.connect('https://carto-vcub.herokuapp.com/');

      socket.on('GeoJsonReady', function(data, json) {
        map.data.addGeoJson(data.json);
        displayDatas(map);
    }); 

}

function geolocation() {
  var map = new google.maps.Map(document.getElementById('map_canevas'), {
    center: {lat: 44.833328, lng: -0.56667},
    zoom: 14
  });

        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Vous êtes ici');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });

        } 

        else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }


    var socket = io.connect('192.168.0.21:8080');

        socket.on('GeoJsonReady', function(data, json) {
        map.data.addGeoJson(data.json);
        displayDatas(map);
  });

}


function displayDatas(map) {
        map.data.forEach(function(feature) { 
          map.data.setStyle(function(feature) {
                 
              if (feature.getProperty('ETAT') =='DECONNECTEE') {
                return ({
                    icon: 'img/croix.png',
                });
              }


              if (feature.getProperty('NBVELOS') >= 5) {
                return ({
                    icon: 'img/bikeok.png',
                });
              }

              if (feature.getProperty('NBVELOS') < 5 && feature.getProperty('NBVELOS') >= 1 ) {
                return ({
                    icon: 'img/bikeoo.png',
                });
              }

              if (feature.getProperty('NBVELOS') == 0) {
                return ({
                    icon: 'img/nobike.png',
                });
              }          

            });

        });

        map.data.addListener('mouseover', function(event) {
            document.getElementById('info-box').innerHTML =
            'Information Station :' + '<br>' 
                + 'Lieu : ' + event.feature.getProperty('NOM') + '<br>' 
                + 'Nombre de places : ' + event.feature.getProperty('NBPLACES')+ '<br>'
                + 'Nombre de vélos : ' + event.feature.getProperty('NBVELOS')+ '<br>'
      }); 

}