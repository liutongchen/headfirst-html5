window.onload = getMyLocation;

//globals-----------------------------------------------------------------------------------------------------------
var watchId = null;
var map = null;
var prevCoords = null;
var ourCoords =  {
	latitude: 47.624851,
	longitude: -122.52099
};

//functions---------------------------------------------------------------------------------------------------------
function getMyLocation() {
    //check to see if the browser supports location service
    if (navigator.geolocation) {
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, it seems that your browser does not support this function.");
    }
}

function watchLocation(position) {
    //set success, failure and optional handler for the watchPosition method
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError, 
                                                  {enableHighAccuracy: true, maximumAge: 60000})
}

function clearWatch() {
    //clear watch data if watchId is not null
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function displayLocation(position) {
    //display current position and accuracy
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var div = document.getElementById("location");

    div.innerHTML = "Your latitude is: " + latitude + "; longitude is: " + longitude + " with accuracy of: " + accuracy;
    
    //display the distance
    var km = computeDistance(position.coords, ourCoords)
    var div = document.getElementById("distance");
    div.innerHTML = "You are " + km + " km from the WickedlySmar HQ"

    //display the map and pin down the position
    if (map == null) {
        showMap(position.coords);
        prevCoords = position.coords;
    } else {
        var meters = computeDistance(position.coords, prevCoords) * 1000;
        if (meters > 0.5) {
            scrollMapToPosition(position.coords);
            prevCoords = position.coords;
        }
    }
    
}

function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}

function degreesToRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}

function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, 
												  coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
    title = "Your location";
    content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
    var markerOptions = {
        position: latlong,
        title: title,
        map: map,
        clickable: true
    }
    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    
    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    })
}

function displayError(error) {
    var errorType = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorType[error.code];
    if (error.code === 0 || error.code === 1) {
        errorMessage = errorMessage + ": " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = new google.maps.LatLng(latitude, longitude);
    map.panTo(latlong);
    addMarker(map, latlong, "Your location", "You moved to: " + latitude + ", " + longitude);
}