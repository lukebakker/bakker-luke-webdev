(function () {
    angular
        .module("DevApp")
        .controller("imageAddController", imageAddController);


    function imageAddController(imageService, $routeParams, userService, $location, albumService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.albumId = $routeParams["albumId"];
        model.imageId = $routeParams["imageId"];


        model.addImageToAlbum = addImageToAlbum;

        function init() {
            imageService.getNewKey()
                .then(function (key) {
                    model.key = key;
                    var promise = userService.findUserById(model.userId);
                    promise.then(function (response) {
                        model.user = response.data;
                        model.followers = model.user.followers;
                        model.following = model.user.following;
                        imageService.getImageById(model.userId, model.imageId)
                            .then(function (image) {
                                model.image = image.data;
                                albumService.findAlbumsForUser(model.userId)
                                    .then(function (albums) {
                                        model.albums = albums;
                                    })
                            });
                    });
                });


        }

        init();

        function addImageToAlbum(albumId) {
            albumService.findAlbumById(albumId)
                .then(function (album) {
                    model.album = album.data;
                    model.album.images.push(model.image._id);
                    albumService.addImage(model.album._id, model.image._id);
                });

        }


    }
})();