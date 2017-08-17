(function () {
    angular
        .module("DevApp")
        .controller("singleAlbumController", singleAlbumController);


    function singleAlbumController(imageService, $routeParams, userService, $location, albumService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.userId = $routeParams["followerId"];
        model.artworks = [];
        model.showArtList = [];
        model.albums = [];
        model.albumId = $routeParams["albumId"];
        model.albumImages = [];

        model.findOneDeviation = findOneDeviation;
        model.searchUser = searchUser;
        model.findMoreLikeThis = findMoreLikeThis;

        function init() {
            imageService.getNewKey()
                .then(function (key) {
                    model.key = key;
                    var promise = userService.findUserById(model.userId);
                    promise.then(function (response) {
                        model.user = response.data;
                        model.followers = model.user.followers;
                        model.following = model.user.following;
                        albumService.findAlbumById(model.albumId, model.user._id)
                            .then(function (album) {
                                model.album = album.data;
                                model.albumName = model.album.name;
                                console.log(model.album);
                                loadImagesForAlbum();
                            })
                    });
                });


        }

        init();

        function loadImagesForAlbum() {
            model.showArt = [];
            for (var u in model.album.images) {
                imageService.getImageById(model.user._id, model.album.images[u])
                    .then(function (image) {
                        model.albumImages.push(image.data);
                    });
            }
            model.showArt = model.albumImages;
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


        function searchUser(username) {
            var userList = [];
            return userService.findUserByUsername(username)
                .then(function (user) {
                    model.showArt = [];
                    $location.url("/profile/" + model.userId + "/search/users");
                });
        }


    }
})();