var app = angular.module('app', []);

app.controller('mainController', function ($scope, $http) {

    $scope.userRecommendation = [];
    $scope.getUserRecommendation = function () {
        console.log($scope.user);

        $http.post('/get_recommendation/user/' +  $scope.user).then(async function (arr) {
            console.log(arr.data);
            //$scope.userRecommendation = arr.data.map(idToName);
            $scope.userRecommendation = await Promise.all(arr.data.map(function(el) { return idToName(el); }))
        }).catch(function (err) {
            console.log(err);
        });
    }

    $scope.titleRecommendation = [];
    $scope.getTitleRecommendation = function () {
        console.log($scope.title);

        $http.post('/get_recommendation/title/' +  $scope.title, { test: $scope.title }).then(async function (arr) {
            console.log(arr.data);
            //$scope.titleRecommendation = arr.data;
            $scope.titleRecommendation = await Promise.all(arr.data.map(function(el) { return idToName(el); }))
        }).catch(function (err) {
            console.log(err);
        });
    }

    $scope.animate = function () {
        if ($scope.title && $scope.title.length) {
            document.getElementById("title-field").classList.remove('empty');
        } else {
            document.getElementById("title-field").classList.add('empty');
            $scope.titleRecommendation = [];
        }

        if ($scope.user && $scope.user.length) {
            document.getElementById("user-field").classList.remove('empty');
        } else {
            document.getElementById("user-field").classList.add('empty');
            $scope.userRecommendation = [];
        }
    }

    async function idToName(id) {
        res = await $http.get('/scrapper/name/' + id);
        console.log(res.data);
        return res.data;
    }

   async function anyToId (id) {
        res = await $http.get('/scrapper/id/' + id);
        console.log(res);
        return res;
    }
});