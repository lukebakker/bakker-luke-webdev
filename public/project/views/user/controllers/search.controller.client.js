(function () {
    angular
        .module("DevApp")
        .controller("searchController", searchController);


    function searchController(searchService, $routeParams, userService) {
        var model = this;
        model.userId = $routeParams["userId"];

        model.artworks = [];
        model.showArtList = [];

        model.searchHot = searchHot;
        model.searchByTag = searchByTag;
        model.findOneDeviation = findOneDeviation;
        model.addFavorite = addFavorite;
        model.showFavoritesForUser = showFavoritesForUser;

        function init() {
            model.key = "a1850727c697f6bc457b4deb512f7ff906f2c7949cdeab0763";
            var promise = userService.findUserById(model.userId);
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
                    for (var u in objects) {
                        newList.push(objects[u]);
                    }
                    return model.showArt = newList;
                });
        }

        function findOneDeviation(deviationId) {
            return searchService.findOneDeviation(model.key, deviationId)
                .then(function (message) {
                    var newList = [];
                    var object = (message);
                    newList.push(object);
                    model.showArt = newList;
                    return newList;
                })
        }

        function addFavorite(deviationId) {
            var theUser = null;
            model.user.favImages.push(deviationId);
            userService.updateUser(model.user, model.userId);
        }

        function showFavoritesForUser() {
            var newList = [];
            model.showArt = newList;
            for (var u in model.user.favImages) {
                findOneDeviation(model.user.favImages[u])
                    .then(function (dev) {
                        console.log(model.showArt);
                        model.showArtList.push(dev[0]);
                    })
            }
            model.showArt = model.showArtList;
        }


    }
})();