(function () {
    angular
        .module("DevApp")
        .controller("singleAlbumController", singleAlbumController);


    function singleAlbumController(imageService, $routeParams, userService, $location, albumService) {
        var model = this;
        model.userId = $routeParams["userId"];

        model.artworks = [];
        model.showArtList = [];
        model.albums = [];
        model.albumId = $routeParams["albumId"];

        model.findOneDeviation = findOneDeviation;
        model.searchUser = searchUser;
        model.findMoreLikeThis = findMoreLikeThis;
        model.loadAlbum = loadAlbum;

        function init() {
            model.key = "7b2ff3ba184d5c48d8a52a519e65df8c1bb4b28b98da90cac5";
            var promise = userService.findUserById(model.userId);
            promise.then(function (response) {
                model.user = response.data;
                model.followers = model.user.followers;
                model.following = model.user.following;
                albumService.findAlbumById(model.albumId)
                    .then(function (album) {
                        model.album = album;
                    })

            });


        }

        init();

        function loadAlbum() {
            model.showArt = [];

            for (var u in model.album) {
                findOneDeviation(model.album[u])
                    .then(function (dev) {
                        model.showArtList.push(dev[0]);
                        model.showArt = model.showArtList;
                    });
            }
            model.showArtList = [];
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
                        console.log(objects[u]);
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