var app = angular.module('app', []);

app.controller('mainController', function ($scope, $http) {

    $scope.userRecommendation = [];
    $scope.getUserRecommendation = function () {
        console.log($scope.user);

        $http.post('/get_recommendation/user/' +  $scope.user, { test: $scope.user }).then(function (arr) {
            console.log(arr);
            $scope.userRecommendation = arr.data;
        }).catch(function (err) {
            console.log(err);
        });
    }

    $scope.titleRecommendation = [];
    $scope.getTitleRecommendation = function () {
        console.log($scope.title);

        $http.post('/get_recommendation/title/' +  $scope.title, { test: $scope.title }).then(function (arr) {
            console.log(arr);
            $scope.titleRecommendation = arr.data;
        }).catch(function (err) {
            console.log(err);
        });
    }

    $scope.animate = function () {
        if ($scope.title && $scope.title.length) {
            document.getElementById("title-field").classList.remove('empty');
        } else {
            document.getElementById("title-field").classList.add('empty');
        }

        if ($scope.user && $scope.user.length) {
            document.getElementById("user-field").classList.remove('empty');
        } else {
            document.getElementById("user-field").classList.add('empty');
        }
    }
});