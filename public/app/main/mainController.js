angular.module('app').controller('mainController', function($http, $scope, mRecipe, mCookies) {

    //Map related
    L.mapbox.accessToken = 'pk.eyJ1IjoiY3BkbGF0bSIsImEiOiJjaWxkZTR1bjgwZWMzdmFtYzd4ajhjcjRnIn0.-y57DqhBHm0jg2-v1JI-UQ';
    var map = L.mapbox.map('map', 'mapbox.streets'),
        geocoder = L.mapbox.geocoder('mapbox.places');
    $scope.latitude = mCookies.read('latitude');
    $scope.longitude = mCookies.read('longitude');
    $scope.location = mCookies.read('location');
    var marker = L.marker([$scope.latitude,$scope.longitude], {
        draggable:'true',
        title: 'Your location'
    });
    marker.on('drag', ondrag);

    $scope.init = function () {
        if($scope.latitude == undefined || $scope.longitude == undefined) {
            var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
        } else {
            geocoder.reverseQuery(
                { lat: parseFloat(mCookies.read('latitude')), lon: parseFloat(mCookies.read('longitude')) },
                function(err, res) {
                    $scope.location = res.features[0].place_name;
                    $scope.$apply();
                });
        }

    };

    var geo_options = {
        enableHighAccuracy: true,
        maximumAge        : 30000,
        timeout           : 27000
    };

    function geo_success(position) {
        $('#location-modal').modal('show');
        $('#map').show();
        if(mCookies.read('latitude') && mCookies.read('longitude')) {
            $scope.latitude = parseFloat(mCookies.read('latitude'));
            $scope.longitude = parseFloat(mCookies.read('longitude'));
        } else {
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
        }
        map.setView([position.coords.latitude, position.coords.longitude], 16);
        $('#location-modal').on('shown.bs.modal', function () { // chooseLocation is the id of the modal.
            map.invalidateSize();
        });
        marker = L.marker([position.coords.latitude,position.coords.longitude], {
            draggable:'true',
            title: 'Your location'
        }).addTo(map);
        ondrag();
    }

    function geo_error() {
        $('#location-modal').modal('show');
        $('#map').show();
        if(mCookies.read('latitude') && mCookies.read('longitude')) {
            $scope.latitude = parseFloat(mCookies.read('latitude'));
            $scope.longitude = parseFloat(mCookies.read('longitude'));
        }
        alert("Please set a location for the application");
        map.setView([$scope.latitude, $scope.longitude], 2);
        $('#location-modal').on('shown.bs.modal', function () { // chooseLocation is the id of the modal.
            map.invalidateSize();
        });
        marker = L.marker([$scope.latitude, $scope.longitude], {
            draggable:'true',
            title: 'Your location'
        }).addTo(map);
        ondrag();
    }

    function ondrag() {
        var m = marker.getLatLng();
        $scope.latitude = m.lat;
        $scope.longitude = m.lng;
        $scope.$apply();
    }

    $scope.closeMap = function() {
        //map.remove();
        mCookies.create('latitude', $scope.latitude);
        mCookies.create('longitude', $scope.longitude);
        geocoder.reverseQuery(
            { lat: parseFloat(mCookies.read('latitude')), lon: parseFloat(mCookies.read('longitude')) },
            function(err, res) {
                $scope.location = res.features[0].place_name;
                $scope.$apply();
            });
    };

    $scope.changeLocation = function() {
        $('#location-modal').modal('show');
        $scope.latitude = parseFloat(mCookies.read('latitude'));
        $scope.longitude = parseFloat(mCookies.read('longitude'));

        map.setView([$scope.latitude, $scope.longitude], 16);
        $('#location-modal').on('shown.bs.modal', function () { // chooseLocation is the id of the modal.
            map.invalidateSize();
        });
        marker.addTo(map);
    };

    // Recipe related
    $scope.recipes = mRecipe.query();

    $scope.sortOptions = [
        {value:"includeIngredients", text: "Included Ingredients"},
        {value:"omitIngredients", text: "Omitted Ingredients"}
    ];

    $scope.includeIngredients = $scope.sortOptions[0].value;
});