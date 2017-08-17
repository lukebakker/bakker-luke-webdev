(function () {
    angular
        .module("DevApp")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "unRegister": unRegister
        };
        return api;

        function unRegister(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url, userId);
        }

        function updateUser(user, userId) {
            var url = "/api/user/" + userId;

            return $http.put(url, user);
        }

        function registerUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/project/user/username?username=" + username;
            return $http.get(url);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }



    }
})
();