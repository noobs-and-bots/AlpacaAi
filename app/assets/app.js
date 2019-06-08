const app = angular.module('app', ['ngRoute'])
    .config(function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist('*');
        $compileProvider.aHrefSanitizationWhitelist('*');
});


const MDCSnackbar = mdc.snackbar.MDCSnackbar;
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
snackbar.timeoutMs = 4000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.controller('mainController', function ($scope, $http) {

    $scope.userRecommendation = [];
    $scope.getUserRecommendation = function () {
        //TODO
        console.log($scope.user);
        $http.post('/get_recommendation/user/' + $scope.user).then(async function (arr) {
            console.log(arr.data);
            //$scope.userRecommendation = arr.data.map(idToName);
            
            $scope.userRecommendation = [];
            for (var el of arr.data)
            {
                $scope.userRecommendation.push({ id: el, name: await idToName(el) });
            }
            /*$scope.userRecommendation = await Promise.all(arr.data.map(async function (el) {
                try {
                    return { id: el, name: await idToName(el) };
                }
                catch(err) {
                    console.log(err);
                    return { id: -1, name: 'Bład, spróbuj ponownie za chwilę' };
                }
            }));*/
        }).catch(function (err) {
            console.log(err);
        });
    }

    $scope.titleRecommendation = [];
    $scope.getTitleRecommendation = function () {

        if (!$scope.title) return;

        console.log($scope.title);
        snackbar.close();
        snackbar.labelText = 'Szukam anime podobnych do ' + $scope.title;
        snackbar.open();

        anyToId($scope.title).then(function (res) {
            $http.post('/get_recommendation/id/' + res).then(async function (arr) {
                console.log(arr.data);
                if(arr.data.length == 0)
                {
                    snackbar.close();
                    snackbar.labelText = 'Nic nie mam';
                    snackbar.open();
                    return;
                }
                
                snackbar.close();
                snackbar.labelText = 'Prawie wyniki, już wyświetlam';
                snackbar.open();
                //arr.data.length = 5;

                $scope.titleRecommendation = [];
                for (var el of arr.data)
                {
                    $scope.titleRecommendation.push({ id: el, name: await idToName(el) });
                    $scope.$apply();
                }
                //$scope.titleRecommendation = arr.data;
                /*$scope.titleRecommendation = await Promise.all(arr.data.map(async function (el) {
                    try {
                        return { id: el, name: await idToName(el) };
                    }
                    catch(err) {
                        console.log(err)
                        return { id: -1, name: 'Bład, spróbuj ponownie za chwilę' };
                    }
                }));*/
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
            /*await sleep(100);
            var res = await fetch('https://cors-anywhere.herokuapp.com/' + 'https://myanimelist.net/anime/' + id);
            var el = document.createElement('html');
            el.innerHTML = await res.text();
            console.log(el.querySelector('span[itemprop="name"]').textContent);
            return el.querySelector('span[itemprop="name"]').textContent;*/

            var text = await fetch('https://video-search-box.herokuapp.com/getAttributesFromSelectors', {
                method: 'POST', body: JSON.stringify({
                    'url': 'https://myanimelist.net/anime/' + id,
                    'selector': 'span[itemprop="name"]',
                    'attribute': 'textContent'
                }),
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) { return response.json(); });

            console.log(text);
            return(text[0]);

        }
        catch(err)
        {
            console.log(err);
            snackbar.close();
            snackbar.labelText = 'Błąd';
            snackbar.open();
            return '?';
        }
        /*try {
            res = await $http.get('/scrapper/name/' + id);
        } catch (error) {
            console.log('error, trying again');
            res = new Promise(function () { return ""});
        }
        console.log(res.data);
        return res.data;*/
    }

    async function anyToId(any) {
        try {
            /*await sleep(100);
            var res = await fetch('https://cors-anywhere.herokuapp.com/' + 'https://myanimelist.net/search/all?q=' + encodeURIComponent(any));
            var el = document.createElement('html');
            el.innerHTML = await res.text();
            var id = /\d+/.exec(el.querySelector('article>div>div:nth-child(2)>a').href)[0];
            console.log(id);
            return id;*/

            var res = await fetch('https://video-search-box.herokuapp.com/getAttributesFromSelectors', {
                method: 'POST', body: JSON.stringify({
                    'url': 'https://myanimelist.net/search/all?q=' + any,
                    'selector': 'article>div>div:nth-child(2)>a',
                    'attribute': 'href'
                }),
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) { return response.json(); });

            console.log(res);
            return /\d+/.exec(res)[0];
        }
        catch(err)
        {
            console.log(err);
            snackbar.close();
            snackbar.labelText = 'Błąd';
            snackbar.open();
            return -1;
        }
        /*try {
            res = await $http.get('/scrapper/id/' + id);
        } catch (error) {
            console.log('error, trying again');
            res = new Promise(function () { return ""});
        }
        console.log(res);
        return res;*/
    }
});