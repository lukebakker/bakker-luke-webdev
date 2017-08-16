(function () {
    angular
        .module("DevApp")
        .factory("albumService", albumService);

    function albumService($http) {

        var api = {
            "findAlbumsForUser": findAlbumsForUser,
            "addAlbumForUser" : addAlbumForUser
        };


        return api;

        function addAlbumForUser(userId, albumName) {
            var url = "/api/project/user/" + userId +"/album/create/" +albumName;
            $http.post(url)
        }

        function findAlbumsForUser(userId) {
            $http.get("/api/project/user/" + userId + "/albums");
        }

    }

})();