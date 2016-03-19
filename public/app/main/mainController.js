angular.module('app').controller('mainController', function($http, $scope, mRecipe, mCookies) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiY3BkbGF0bSIsImEiOiJjaWxkZTR1bjgwZWMzdmFtYzd4ajhjcjRnIn0.-y57DqhBHm0jg2-v1JI-UQ';
    var marker;
    var map = L.mapbox.map('map', 'mapbox.streets');
    $scope.latitude = 0.0;
    $scope.longitude = 0.0;

    function geo_success(position) {
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        map.setView([position.coords.latitude, position.coords.longitude], 16);
        $('#location-modal').on('shown.bs.modal', function () { // chooseLocation is the id of the modal.
            map.invalidateSize();
        });
        marker = L.marker([position.coords.latitude,position.coords.longitude], {
            draggable:'true',
            title: 'Your location'
        }).addTo(map);
        marker.on('drag', ondrag);
        ondrag();
    }

    function ondrag() {
        var m = marker.getLatLng();
        $scope.latitude = m.lat;
        $scope.longitude = m.lng;
        $scope.$apply();
    }

    function geo_error() {
        alert("Please set a location for the application");
        map.setView([0, 0], 2);
        $('#location-modal').on('shown.bs.modal', function () { // chooseLocation is the id of the modal.
            map.invalidateSize();
        });
        marker = L.marker([0,0], {
            draggable:'true',
            title: 'Your location'
        }).addTo(map);
        marker.on('drag', ondrag);
        ondrag();
    }

    var geo_options = {
        enableHighAccuracy: true,
        maximumAge        : 30000,
        timeout           : 27000
    };

    var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

    $scope.recipes = mRecipe.query();

    $scope.sortOptions = [
        {value:"includeIngredients", text: "Included Ingredients"},
        {value:"omitIngredients", text: "Omitted Ingredients"}
    ];

    $scope.includeIngredients = $scope.sortOptions[0].value;

    $scope.init = function () {
        var userLocation = mCookies.read('location');
        if(userLocation == undefined)
            $('#location-modal').modal('show');
    };

    $scope.closeMap = function() {
        map.remove();
        mCookies.create('location', $scope.latitude + ', ' + $scope.longitude);
    }
});