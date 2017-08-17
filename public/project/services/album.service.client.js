(function () {
    angular
        .module("DevApp")
        .factory("albumService", albumService);

    function albumService($http) {

        var api = {
            "findAlbumsForUser": findAlbumsForUser,
            "addAlbumForUser": addAlbumForUser,
            "findAlbumById": findAlbumById,
            "updateAlbum": updateAlbum,
            "removeImage": removeImage
        };


        return api;


        function findAlbumById(albumId, userId) {
            var url = "/api/project/user/" + userId + "/album/" + albumId;
            return $http.get(url)
                .then(function (album) {
                    return album;
                })
        }

        function addAlbumForUser(userId, albumName) {
            var url = "/api/project/user/" + userId + "/album/create/" + albumName;
            $http.post(url)
        }

        function findAlbumsForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/albums")
                .then(function (albums) {
                    return albums.data;
                });
        }

        function removeImage(albumId, imageId) {
            return $http.delete(("/api/project/albums/" + albumId + "/image/" + imageId))
                .then(function (data) {
                    return data;
                })
        }

        function updateAlbum(albumId, album) {
            console.log(album);
            var url = "/api/project/albums/" + albumId + "/update";
            return $http.put(url, album);
        }

    }

})();