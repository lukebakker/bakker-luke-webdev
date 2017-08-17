(function () {
    angular
        .module("DevApp")
        .controller("searchController", searchController);


    function searchController(imageService, $routeParams, userService, $location, albumService) {
        var model = this;


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
        model.findMoreLikeThis = findMoreLikeThis;
        model.addFavorite = addFavorite;
        model.getRandomImageId = getRandomImageId;

        function init() {
            model.userId = $routeParams["userId"];
            imageService.getNewKey()
                .then(function (key) {
                        model.key = key;
                        var promise = userService.findUserById(model.userId);
                        promise.then(function (response) {
                            model.user = response.data;
                            model.followers = model.user.followers;
                            model.following = model.user.following;
                            albumService.findAlbumsForUser(model.user._id)
                                .then(function (albums) {
                                    model.albums = albums;
                                    model.getRandomImageId()
                                        .then(function (imageId) {
                                            findMoreLikeThis(imageId)
                                        });
                                });
                        });
                    }
                );

        }

        init();

        function getRandomImageId() {
            var album = model.albums[Math.floor(Math.random() * model.albums.length)];
            var randomId = album.images[Math.floor(Math.random() * album.images.length)];
            return imageService.getImageById(model.user._id, randomId)
                .then(function (image) {
                    return image.data.deviantId;
                })

        }

        function searchHot() {
            imageService
                .searchDeviations(model.key)
                .then(function (message) {
                    model.artworks = message;
                    var art = model.artworks;
                    var newList = [];
                    for (var u in art) {
                        for (var v in art[u]) {
                            newList.push(art[u][v]);
                        }
                    }
                    model.showArt = newList;
                });

        }

        function searchByTag(tag) {
            imageService
                .browseByTag(model.key, tag)
                .then(function (message) {
                    var newList = [];
                    var objects = (message.results);
                    for (var u in objects) {
                        newList.push(objects[u]);
                    }
                    model.showArt = newList;
                    $location.url("/profile/" + model.userId + "/home");

                });
        }


        function findOneDeviation(deviationId) {
            model.showArt = [];
            return imageService.findOneDeviation(model.key, deviationId)
                .then(function (message) {
                    var newList = [];
                    var object = (message);
                    newList.push(object);
                    model.showArt = newList;
                    return newList;
                })
        }

        function findMoreLikeThis(deviationId) {
            model.showArt = [];
            return imageService.findMoreLikeThis(model.key, deviationId)
                .then(function (message) {
                    var newList = [];
                    var objects = (message.results);
                    for (var u in objects) {
                        newList.push(objects[u]);
                    }
                    return model.showArt = newList;
                });
        }


        function addFavorite(deviationId) {
            var albumName = "Favorites";
            userService.updateUser(model.user, model.userId)
                .then(function (data) {
                    imageService.findOneDeviation(model.key, deviationId)
                        .then(function (deviation) {
                            imageService.addImage(model.userId, deviation, albumName);
                        })
                });
        }


        function showFavoritesForUser() {


            albumService.findAlbumsForUser(model.userId)
                .then(function (albums) {
                    for (var i in albums) {
                        if (albums[i].name == "Favorites") {
                            model.favorites = albums[i];
                            $location.url("/profile/" + model.userId + "/home/albums/" + model.favorites._id + "/edit");
                        }
                    }
                });
        }

        function showFavoritesForUserByUsername(username) {
            model.showArt = [];
            return userService.findUserByUsername(username)
                .then(function (user) {
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
                    userService.updateUser(user.data[0], user.data[0]._id)
                        .then(function (data) {
                            model.user.following.push(user.data[0]._id);
                            userService.updateUser(model.user, model.userId);
                            model.following = model.user.following;
                            model.followers = model.user.followers;

                        });
                });
        }


    }
})
();