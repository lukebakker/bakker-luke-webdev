(function () {
    angular
        .module("DevApp")
        .controller("albumEditController", albumEditController);


    function albumEditController(imageService, $routeParams, userService, $location, albumService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.albumId = $routeParams["albumId"];

        model.artworks = [];
        model.showArtList = [];
        model.albums = [];
        model.albumImages = [];

        model.editAlbum = editAlbum;
        model.findOneDeviation = findOneDeviation;
        //model.loadAlbum = loadAlbum;
        model.removeImage = removeImage;

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
                                loadImagesForAlbum();
                            })
                    });
                });


        }

        init();

        function removeImage(imageId) {
            console.log(imageId);
            albumService.removeImage(model.albumId, imageId);
            $location.url("/profile/" + model.userId + "/home/albums/" + model.albumId + "/edit");
        }


        function editAlbum(albumName) {
            model.album.name = albumName;
            albumService.updateAlbum(model.albumId, model.album);
            albumService.findAlbumById(model.albumId)
                .then(function (album) {
                    model.album = album.data;
                });
            $location.url("/profile/" + model.userId + "/home/albums");
        }


        function loadImagesForAlbum() {
            var newList = [];
            for (var u in model.album.images) {
                imageService.getImageById(model.user._id, model.album.images[u])
                    .then(function (image) {
                        console.log(image.data);
                        model.albumImages.push(image.data);
                    });
            }
            model.showArt = model.albumImages;
        }


        function findOneDeviation(deviationId) {
            model.showArt = [];
            return imageService.findOneDeviation(model.key, deviationId)
                .then(function (message) {
                    console.log(message);
                    var newList = [];
                    var object = (message);
                    newList.push(object);
                    model.showArt = newList;
                    return newList;
                })
        }


    }
})();