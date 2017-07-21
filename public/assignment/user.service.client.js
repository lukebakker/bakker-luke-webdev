(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService() {

        // JSON = JavaScript Object Notation
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "findUsernameByUsernameAndPassword": findUsernameByUsernameAndPassword
        };
        return api;

        function findUsernameByUsernameAndPassword(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user._username === username && user._password === password) {
                    return user;
                }
            }
            return null;
        }


        function findUserById(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    $scope.user = users[u];
                }
            }
        }

    }
});