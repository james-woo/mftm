angular.module('app').controller('mainController', function($http, $scope, mRecipe, mIngredient, mEquipment, mCookies, $location) {

    //Map related
    L.mapbox.accessToken = 'pk.eyJ1IjoiY3BkbGF0bSIsImEiOiJjaWxkZTR1bjgwZWMzdmFtYzd4ajhjcjRnIn0.-y57DqhBHm0jg2-v1JI-UQ';
    var map = L.mapbox.map('map', 'mapbox.streets'),
        geocoder = L.mapbox.geocoder('mapbox.places');
    $scope.latitude = mCookies.read('latitude');
    $scope.longitude = mCookies.read('longitude');
    $scope.location = mCookies.read('location');

    var region = function(lat,lon) {
        if(lat > 45 && lon < -105) {
            return "Western Canada";
        } else if(lat > 45 && lon > -105) {
            return "Eastern Canada";
        }
    };

    var season = function() {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var d = new Date();
        var month = monthNames[d.getMonth()]+",";
        var winter = 'December,January,February';
        var spring = 'March,April,May';
        var summer = 'June,July,August';
        var fall = 'September,October,November';
        var season = 'unknown';
        if (winter.indexOf(month) != -1) {
            season = 'Winter';
        } else if (spring.indexOf(month) != -1) {
            season = 'Spring';
        } else if (summer.indexOf(month) != -1) {
            season = 'Summer';
        } else if (fall.indexOf(month) != -1) {
            season = 'Fall';
        }
        return season;
    };

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
                    mCookies.create('location', $scope.location);
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
                mCookies.create('location', $scope.location);
                $scope.$apply();
                location.reload();
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

    //1. get user location
    //2. get ingredients
    //3. get ingredients local to user ($scope.suggestions)
    //4. show ingredients based on $scope.suggestions

    $scope.recipes = mRecipe.query();
    $scope.ingredients = [];//mIngredient.query();
    $scope.equipment = mEquipment.query();

    function initializeIngredients(ingredients) {
        $scope.userIngredients = [];
        return mIngredient.query(function(ingredients){
            $scope.ingredients = ingredients;
            var userIngredients = [];
            var userRegion = region($scope.latitude, $scope.longitude);
            for(var i = 0; i < ingredients.length; i++) {
                if(ingredients[i].local == userRegion) {
                    userIngredients.push(ingredients[i].name);
                }
            }
            $scope.userIngredients = userIngredients;
        });
    }

    var initializeSuggestions = initializeIngredients($scope.ingredients);
    initializeSuggestions.$promise.then(
        function(resolve) {
            $scope.suggestions = $scope.userIngredients;
        }
    );

    //default values
    function setDefaults() {
        $scope.omitted = ["Durian", "Agar-Agar"];
        $scope.excludeequipment = ["Nothing"];

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
        mCookies.createJSON('omitted', $scope.omitted);
        mCookies.createJSON('excludeequipment', $scope.excludeequipment);
        mCookies.create('breakfast', $scope.mealtypeCheck.breakfast);
        mCookies.create('lunch', $scope.mealtypeCheck.lunch);
        mCookies.create('dinner', $scope.mealtypeCheck.dinner);
        mCookies.create('snacks', $scope.mealtypeCheck.snacks);
        mCookies.create('easy', $scope.difficultyCheck.easy);
        mCookies.create('medium', $scope.difficultyCheck.medium);
        mCookies.create('hard', $scope.difficultyCheck.hard);
    }

    $scope.initPreferences = function() {
        var prefs = mCookies.read('prefs');
        if(prefs != 1) {
            setDefaults();
            mCookies.create('prefs', 1);
        } else {
            $scope.omitted = mCookies.readJSON('omitted');
            $scope.excludeequipment = mCookies.readJSON('excludeequipment');
            var breakfastCheck = bool(mCookies.read('breakfast'));
            var lunchCheck = bool(mCookies.read('lunch'));
            var dinnerCheck = bool(mCookies.read('dinner'));
            var snackCheck = bool(mCookies.read('snacks'));
            var easyCheck = bool(mCookies.read('easy'));
            var mediumCheck = bool(mCookies.read('medium'));
            var hardCheck = bool(mCookies.read('hard'));

            $scope.mealtypeCheck = {
                breakfast: breakfastCheck,
                lunch: lunchCheck,
                dinner: dinnerCheck,
                snacks: snackCheck
            };

            $scope.difficultyCheck = {
                easy: easyCheck,
                medium: mediumCheck,
                hard: hardCheck
            };

        }
    };

    // Recipe related

    $scope.userMealtype = function() {
        var t = $scope.mealtypeCheck;
        var userMealtype = [];
        if(t.breakfast)
            userMealtype.push("Breakfast");
        if(t.lunch)
            userMealtype.push("Lunch");
        if(t.dinner)
            userMealtype.push("Dinner");
        if(t.snacks)
            userMealtype.push("Snacks");
        return userMealtype;
    };

    $scope.userDifficulty = function() {
        var d = $scope.difficultyCheck;
        var userDifficulty = [];
        if(d.easy)
            userDifficulty.push("Easy");
        if(d.medium)
            userDifficulty.push("Medium");
        if(d.hard)
            userDifficulty.push("Hard");
        return userDifficulty;
    };

    $scope.insertIngredients = function(ingredient){
        $scope.ingredient = ingredient;
        if($scope.suggestions.indexOf(ingredient.name) == -1) {
            $scope.suggestions.push(ingredient.name.replace(/\s/g, ''));
            //mCookies.insertJSON('suggestions', [ingredient.name]);
        }
    };

    $scope.removeSuggestion = function(ingredient) {
        if($scope.suggestions.indexOf(ingredient) != -1) {
            var i = $scope.suggestions.indexOf(ingredient);
            $scope.suggestions.splice(i, 1);
            //mCookies.remove('suggestions', [ingredient]);
        }
    };

    $scope.insertOmitted = function(omit){
        $scope.omit = omit;
        if($scope.omitted.indexOf(omit.name) == -1) {
            $scope.omitted.push(omit.name.replace(/\s/g, ''));
            mCookies.insertJSON('omitted', [omit.name]);
        }
    };

    $scope.removeOmitted = function(omit) {
        if($scope.omitted.indexOf(omit) != -1) {
            var i = $scope.omitted.indexOf(omit);
            $scope.omitted.splice(i, 1);
            mCookies.remove('omitted', omit);
        }
    };

    $scope.insertEquipment = function(e){
        $scope.e = e;
        if($scope.excludeequipment.indexOf(e.name) == -1) {
            $scope.excludeequipment.push(e.name.replace(/\s/g, ''));
            mCookies.insertJSON('excludeequipment', [e.name]);
        }
    };

    $scope.removeEquipment = function(e) {
        if($scope.excludeequipment.indexOf(e) != -1) {
            var i = $scope.excludeequipment.indexOf(e);
            $scope.excludeequipment.splice(i, 1);
            mCookies.remove('excludeequipment', e);
        }
    };

    $scope.updateMealtype = function() {
        mCookies.update('breakfast', $scope.mealtypeCheck.breakfast);
        mCookies.update('lunch', $scope.mealtypeCheck.lunch);
        mCookies.update('dinner', $scope.mealtypeCheck.dinner);
        mCookies.update('snacks', $scope.mealtypeCheck.snacks);
    };

    $scope.updateDifficulty = function() {
        mCookies.update('easy', $scope.difficultyCheck.easy);
        mCookies.update('medium', $scope.difficultyCheck.medium);
        mCookies.update('hard', $scope.difficultyCheck.hard);
    };

    $scope.filterRecipe = function (recipe) {
        if(filterOmitIngredients(recipe) === true || filterExcludedEquipment(recipe) === true) {
            return false;
        }
        return filterIngredients(recipe) || filterDifficulty(recipe) && filterMealtype(recipe) && filterSeason(recipe);
    };

    function noFilter(filterObj) {
        for (var key in filterObj) {
            if (filterObj[key]) {
                return false;
            }
        }
        return true;
    }

    function filterDifficulty(recipe) {
        var difficulty = recipe.difficulty;
        var diff = $scope.userDifficulty();
        for(var j = 0; j < diff.length; j++) {
            diff[j] = diff[j].replace(/\s/g, '');
            if(difficulty.indexOf(diff[j]) > -1) {
                return true;
            }
        }
        return false;
    }

    function filterMealtype(recipe) {
        var type = recipe.meal_type.split(",");
        var meals = $scope.userMealtype();
        for(var j = 0; j < type.length; j++) {
            type[j] = type[j].replace(/\s/g, '');
            if(meals.indexOf(type[j]) > -1) {
                return true;
            }
        }
        return false;
    }

    function filterIngredients(recipe) {
        if($scope.suggestions == undefined) {
            return true;
        }
        var ingredients = recipe.ingredients.split(",");
        for(var j = 0; j < ingredients.length; j++) {
            ingredients[j] = ingredients[j].replace(/\s/g, '');
            if($scope.suggestions.indexOf(ingredients[j]) > -1) {
                return true;
            }
        }
        return false;
    }

    function filterOmitIngredients(recipe) {
        var ingredients = recipe.ingredients.split(",");
        for(var j = 0; j < ingredients.length; j++) {
            ingredients[j] = ingredients[j].replace(/\s/g, '');
            if($scope.omitted.indexOf(ingredients[j]) > -1) {
                return true;
            }
        }
        return false;
    }

    function filterExcludedEquipment(recipe) {
        var equipment = recipe.equipment.split(",");
        for(var j = 0; j < equipment.length; j++) {
            equipment[j] = equipment[j].replace(/\s/g, '');
            if($scope.excludeequipment.indexOf(equipment[j]) > -1) {
                return true;
            }
        }
        return false;
    }

    function filterSeason(recipe) {
        var rSeason = recipe.season.split(",");
        var cSeason = season();
        for(var j = 0; j < rSeason.length; j++) {
            rSeason[j] = rSeason[j].replace(/\s/g, '');
            if(cSeason.indexOf(rSeason[j]) > -1) {
                return true;
            }
        }
        return false;
    }

    function bool(string){
        switch(string.toLowerCase().trim()){
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(string);
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
