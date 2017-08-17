(function () {
    angular
        .module("DevApp")
        .controller("albumNewController", albumNewController);


    function albumNewController(imageService, $routeParams, userService, $location, albumService) {
        var model = this;
        model.userId = $routeParams["userId"];


        model.addAlbum = addAlbum;

        function init() {
            var promise = userService.findUserById(model.userId);
            promise.then(function (response) {
                model.user = response.data;
            });
            console.log("HERE");
        }

        init();


        function addAlbum(albumName) {
            albumService.addAlbumForUser(model.user._id, albumName);
            $location.url("/profile/" + model.userId + "/home/albums");
        }


    }
})();