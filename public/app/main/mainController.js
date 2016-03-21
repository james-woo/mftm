angular.module('app').controller('mainController', function($http, $scope, mRecipe, mIngredient, mCookies) {

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

    $scope.initLocation = function () {
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
    // Preferences

    //default values
    function setDefaults() {
        $scope.suggestions = ["Mongoose"];
        $scope.omitted = ["Salt"];
        $scope.equipment = ["Pan"];

        $scope.mealtypeCheck = {
            breakfast: true,
            lunch: true,
            dinner: true,
            snacks: true
        };

        $scope.difficultyCheck = {
            easy: true,
            medium: true,
            hard: true
        };
    }


    $scope.initPreferences = function() {
        console.log("loading preferences");
        var prefs = mCookies.read('prefs');
        if(prefs == undefined) {
            setDefaults();
            mCookies.create('prefs', 1);
        } else {
            $scope.suggestions = ["Mongoose"];
            $scope.omitted = mCookies.read('omitted');
            $scope.equipment = mCookies.read('equipment');
            var breakfastCheck = mCookies.read('breakfast');
            var lunchCheck = mCookies.read('lunch');
            var dinnerCheck = mCookies.read('dinner');
            var snackCheck = mCookies.read('snack');
            var easyCheck = mCookies.read('easy');
            var mediumCheck = mCookies.read('medium');
            var hardCheck = mCookies.read('hard');

            $scope.mealtypeCheck = {
                breakfast: breakfastCheck,
                lunch: lunchCheck,
                dinner: dinnerCheck,
                snack: snackCheck
            };

            $scope.difficultyCheck = {
                easy: easyCheck,
                medium: mediumCheck,
                hard: hardCheck
            };
        }
    };

    // Recipe related
    $scope.recipes = mRecipe.query();
    $scope.ingredients = mIngredient.query();

    $scope.filterIngredients = function(ingredient){
        $scope.ingredient = ingredient;
        if($scope.suggestions.indexOf(ingredient.name) == -1) {
            $scope.suggestions.push(ingredient.name);
        }
    };

    $scope.removeSuggestion = function(ingredient) {
        /*for(var i = 0; i < $scope.suggestions.length; i++){
            if($scope.suggestions[i].name == ingredient){
                $scope.suggestions.splice(i,1);
                break; // If you want to break out of the loop once you've found a match
            }
        }*/
        if($scope.suggestions.indexOf(ingredient) > -1) {
            var i = $scope.suggestions.indexOf(ingredient);
            $scope.suggestions.splice(i, 1);
        }
    }

});

angular.module('app').directive('typeahead', ['$compile', '$timeout', function($compile, $timeout) {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            ngModel: '=',
            typeahead: '=',
            typeaheadCallback: "="
        },
        link: function(scope, elem, attrs) {
            var template = '<div class="dropdown"><ul class="dropdown-menu" style="display:block;" ng-hide="!ngModel.length || !filitered.length || selected"><li ng-repeat="item in filitered = (typeahead | filter:{name:ngModel} | limitTo:5) track by $index" ng-click="click(item)" style="cursor:pointer" ng-class="{active:$index==active}" ng-mouseenter="mouseenter($index)"><a>{{item.name}}</a></li></ul></div>'

            elem.bind('blur', function() {
                $timeout(function() {
                    scope.selected = true
                }, 100)
            });

            elem.bind("keydown", function($event) {
                if($event.keyCode == 38 && scope.active > 0) { // arrow up
                    scope.active--;
                    scope.$digest()
                } else if($event.keyCode == 40 && scope.active < scope.filitered.length - 1) { // arrow down
                    scope.active++;
                    scope.$digest()
                } else if($event.keyCode == 13) { // enter
                    scope.$apply(function() {
                        scope.click(scope.filitered[scope.active])
                    })
                }
            });

            scope.click = function(item) {
                scope.ngModel = item.name;
                scope.selected = item;
                if(scope.typeaheadCallback) {
                    scope.typeaheadCallback(item)
                }
                elem[0].blur()
            };

            scope.mouseenter = function($index) {
                scope.active = $index
            };

            scope.$watch('ngModel', function(input) {
                if(scope.selected && scope.selected.name == input) {
                    return
                }

                scope.active = 0;
                scope.selected = false;

                // if we have an exact match and there is only one item in the list, automatically select it
                if(input && scope.filitered.length == 1 && scope.filitered[0].name.toLowerCase() == input.toLowerCase()) {
                    scope.click(scope.filitered[0])
                }
            });

            elem.after($compile(template)(scope))
        }
    }
}]);
