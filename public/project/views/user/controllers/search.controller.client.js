(function () {
    angular
        .module("DevApp")
        .controller("searchController", searchController);


    function searchController(searchService, $routeParams, userService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];

        model.artworks = [];
        model.showArtList = [];

        model.searchHot = searchHot;
        model.searchByTag = searchByTag;
        model.findOneDeviation = findOneDeviation;
        model.addFavorite = addFavorite;
        model.showFavoritesForUser = showFavoritesForUser;
        model.searchUser = searchUser;
        model.showFavoritesForUserByUsername = showFavoritesForUserByUsername;
        model.follow = follow;

        function init() {
            model.key = "f6f09b5f77c083203dca0f3fc994f5a1e286215dd8dfd22a65";
            var promise = userService.findUserById(model.userId);
            promise.then(function (response) {
                model.user = response.data;
                model.followers = model.user.followers;
                model.following = model.user.following;
                model.text = "A";
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
            model.showArt = [];
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
            model.showArt = [];

            var newList = [];
            model.showArt = newList;
            for (var u in model.user.favImages) {
                findOneDeviation(model.user.favImages[u])
                    .then(function (dev) {
                        model.showArtList.push(dev[0]);
                        model.showArt = model.showArtList;
                    });

            }
            model.showArtList = [];

        }

        function showFavoritesForUserByUsername(username) {
            model.showArt = [];

            var newList = [];
            model.showArt = newList;
            return userService.findUserByUsername(username)
                .then(function (user) {
                    console.log(user.data[0].favImages);
                    for (var u in user.data[0].favImages) {
                        findOneDeviation(user.data[0].favImages[u])
                            .then(function (dev) {
                                model.showArtList.push(dev[0]);
                                model.showArt = model.showArtList;
                            });
                    }
                    model.showArtList = [];
                });


        }

        function searchUser(username) {
            var userList = [];
            return userService.findUserByUsername(username)
                .then(function (user) {
                    model.showArt = [];
                    $location.url("/profile/" + model.userId + "/search/users");
                });

        }

        function follow(username) {

            return userService.findUserByUsername(username)
                .then(function (user) {
                    user.data[0].followers.push(model.userId);
                    console.log("this is the user", user.data[0]._id);
                    userService.updateUser(user.data[0], user.data[0]._id)
                        .then(function (data) {
                            model.user.following.push(user.data[0]._id);
                            userService.updateUser(model.user, model.userId);
                            model.following = model.user.following;
                            model.followers = model.user.followers;

                            console.log(model.user.following);
                        });
                });

        }




    }
})();