(function () {
    angular
        .module("DevApp")
        .factory("albumService", albumService);

    function albumService($http) {

        var api = {
            "findAlbumsForUser": findAlbumsForUser
        };


        return api;

        function findAlbumsForUser(userId) {
            var userIdSend = userId;
            $http.get("/api/project/user/" + userId + "/albums");
        }

    }

})();