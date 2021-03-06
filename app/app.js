const myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

myNinjaApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomepageController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'NinjaController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        .otherwise({
            redirectTo: '/home'
        })
    
}]);

myNinjaApp.directive('firstNinja', function(){
    return {
        template: 'First ninja is {{ninjas[0].name}}'
    }
});

myNinjaApp.directive('secondNinja', function(){
    return {
        restrict: 'E',
        scope: {
          prefix: '=',
          ninjas: '='
        },
        template: 'Second ninja is {{prefix}} {{ninjas[1].name}}'
    }
});

myNinjaApp.directive('randomNinja', [function() {

    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        // template: '<img ng-src="{{ninjas[0].thumb}}"/>',
        transclude: true,
        replace: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    }
}]);

myNinjaApp.service('httpFetcher', ['$rootScope', '$http', function ($rootScope, $http) {
    var fetchNinjas = function() {
        return $http.get('data/ninjas.json');
    };

    return {
        getNinjas: fetchNinjas
    };
}]);

myNinjaApp.controller('HomepageController', ['$scope', 'httpFetcher', function ($scope, httpFetcher) {
    httpFetcher.getNinjas()
        .then(function(res){
            $scope.ninjas = res.data;
        }, function() {
            $scope.error = 'unable to get the ponies';
        });
}]);

myNinjaApp.controller('NinjaController', ['$scope', 'httpFetcher', function($scope, httpFetcher){

    $scope.removeNinja = function(ninja) {
        // $scope.ninjas = $scope.ninjas.filter(n => !(n === ninja));
        const removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.addNinja = function() {
        $scope.ninjas.push({
            name: $scope.newNinja.name,
            belt: $scope.newNinja.belt,
            rate: parseInt($scope.newNinja.rate),
            available: true
        });

        $scope.newNinja.name = "";
        $scope.newNinja.belt = "";
        $scope.newNinja.rate = "";
    };

    $scope.removeAllNinjas = function() {
      $scope.ninjas = [];
    };

    httpFetcher.getNinjas()
        .then(function(res){
            $scope.ninjas = res.data;
        }, function() {
            $scope.error = 'unable to get the ponies';
        });
    // console.log(angular.toJson($scope.ninjas));

}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {
    $scope.sendMessage = function() {
        $location.path('/contact-success');
    }
}]);