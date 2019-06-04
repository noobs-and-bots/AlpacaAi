var app = angular.module('app', ['ngRoute'])
    .config(function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist('*');
        $compileProvider.aHrefSanitizationWhitelist('*');

    });

app.controller('mainController', function ($scope, $http) {

    $scope.userRecommendation = [];
    $scope.getUserRecommendation = function () {
        console.log($scope.user);

        $http.post('/get_recommendation/user/' + $scope.user).then(async function (arr) {
            console.log(arr.data);
            //$scope.userRecommendation = arr.data.map(idToName);
            $scope.userRecommendation = await Promise.all(arr.data.map(async function (el) {
                return { id: el, name: await idToName(el)
                };
            }));
        }).catch(function (err) {
            console.log(err);
        });
    }

    $scope.titleRecommendation = [];
    $scope.getTitleRecommendation = function () {
        console.log($scope.title);

        anyToId($scope.title).then(function (res) {
            $http.post('/get_recommendation/id/' + res.data).then(async function (arr) {
                console.log(arr.data);
                //$scope.titleRecommendation = arr.data;
                $scope.titleRecommendation = await Promise.all(arr.data.map(async function (el) {
                    return { id: el, name: await idToName(el) };
                }));
            }).catch(function (err) {
                console.log(err);
            });
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

    $scope.openUrl = function (url) {
        console.log(url);
        window.open(url);
    }

    async function idToName(id) {
        try {
            res = await $http.get('/scrapper/name/' + id);
        } catch (error) {
            console.log('error, trying again');
            res = await idToName(id);
        }
        console.log(res.data);
        return res.data;
    }

    async function anyToId(id) {
        try {
            res = await $http.get('/scrapper/id/' + id);
        } catch (error) {
            console.log('error, trying again');
            res = await anyToId(id);
        }
        console.log(res);
        return res;
    }
});