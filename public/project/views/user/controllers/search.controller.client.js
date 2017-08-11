(function () {
    angular
        .module("DevApp")
        .controller("searchController", searchController);


    function searchController(searchService, $routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.artworks = [];

        model.searchHot = searchHot;
        model.searchByTag = searchByTag;
        model.findOneDeviation = findOneDeviation;

        function init() {
            model.key = "0b94aa0d583de7116fe537cc5c343afe77c095291c85864b28";
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
            });
        }

        init();

        function searchHot() {
            searchService
                .searchDeviations(model.key)
                .then(function (message) {
                    return model.artworks = message;
                });
            var art = model.artworks;
            var newList = [];
            for (var u in art) {
                for (var v in art[u]) {
                    newList.push(art[u][v]);
                }
            }
            model.showArt = newList;
        }

        function searchByTag(tag) {
            searchService
                .browseByTag(model.key, tag)
                .then(function (message) {
                    var newList = [];
                    var objects = (message.results);
                    console.log(objects);
                    for (var u in objects) {
                        newList.push(objects[u]);
                    }
                    console.log(newList);
                    return model.showArt = newList;
                });
        }

        function findOneDeviation(deviationId) {
            searchService.findOneDeviation(model.key, deviationId)
                .then(function (message) {
                    var newList = [];
                    var object = (message);
                    console.log(object);
                    newList.push(object);
                    console.log(newList);
                    return model.showArt = newList;
                })
        }


    }
})();