const myNinjaApp = angular.module('myNinjaApp', []);

myNinjaApp.controller('NinjaController', ['$scope', function($scope){

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

    $scope.ninjas = [
        {
            name: "yoshi",
            belt: "green",
            rate: 30,
            available: true,
            thumb: "content/img/yoshi.jpg"
        }, {
            name: "crystal",
            belt: "yellow",
            rate: 50,
            available: true
        }, {
            name: "ryu",
            belt: "orange",
            rate: 20,
            available: false
        }, {
            name: "shaun",
            belt: "black",
            rate: 100,
            available: true
        }
    ];

}]);