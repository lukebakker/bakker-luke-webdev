(function () {
    angular
        .module("DevApp")
        .factory("albumService", albumService);

    function albumService($http) {

        var api = {
            "findAlbumsForUser": findAlbumsForUser,
            "addAlbumForUser" : addAlbumForUser,
            "findAlbumById" : findAlbumById
        };


        return api;

        function findAlbumById(albumId) {
            var url = "/api/project/user/" + userId +"/album/" + albumId;
            return $http.get(url)
                .then(function (album) {
                    return album;
                })
        }

        function addAlbumForUser(userId, albumName) {
            var url = "/api/project/user/" + userId +"/album/create/" +albumName;
            $http.post(url)
        }

        function findAlbumsForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/albums")
                .then(function(albums){
                    return albums.data;
                });
        }

    }

})();