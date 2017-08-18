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
            "unRegister": unRegister,
            "findFollowing": findFollowing,
            "findFollowers": findFollowers,
            "findAllUsers": findAllUsers,
            "removeUser": removeUser,
            "checkLogin": checkLogin,
            "unFollow": unFollow,
            "unFollowed" : unFollowed

        };
        return api;

        function removeUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function findAllUsers() {
            var url = "/api/users";
            return $http.get(url);
        }

        function unRegister(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url, userId);
        }

        function updateUser(user, userId) {
            var url = "/api/user/" + userId;

            return $http.put(url, user);
        }

        function registerUser(user) {
            var url = "/api/user/register";
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
            var url = "/api/login";
            return $http.post(url, {username: username, password: password});
        }

        function findFollowing(userId) {
            var url = "/api/user/" + userId + "/following";
            return $http.get(url);
        }

        function findFollowers(userId) {
            var url = "/api/user/" + userId + "/followers";
            return $http.get(url);
        }

        function unFollow(userId, unFollowId) {
            var url = "/api/user/" + userId + "/unfollow/" + unFollowId;
            return $http.delete(url);
        }

        function unFollowed(userId, unFollowedId) {
            var url = "/api/user/" + userId + "/removeFollow/" + unFollowedId;
            return $http.delete(url);
        }

        function checkLogin() {
            return $http.get("/api/checkLogin")
                .then(function (user) {
                    return user.data;
                })
        }


    }
})
();