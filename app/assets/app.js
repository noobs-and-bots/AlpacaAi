var app = angular.module('app', []);

app.controller('mainController', function ($scope, $http) {
    $scope.getUserRecommendation = function () {
        console.log($scope.username);
    }

    $scope.getTitleRecommendation = function () {
        console.log($scope.title);
    }
});