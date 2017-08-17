(function () {

    angular
        .module("DevApp")
        .controller("adminController", adminController);

    function adminController($routeParams, userService, $location) {
        var model = this;
        var userId = $routeParams["userId"];
        var nonAdminUserId = $routeParams["nonAdminUserId"];

        model.updateUser = updateUser;
        model.unRegister = unRegister;
        model.removeUser = removeUser;

        function init() {
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
                userService.findAllUsers()
                    .then(function(users){
                        model.users = users.data;
                        if(nonAdminUserId != null) {
                            userService.findUserById(nonAdminUserId)
                                .then(function (user) {
                                    model.nonAdminUser = user.data;
                                })
                        }
                    });
            });


        }

        init();

        function removeUser(removeUserId) {
            userService.removeUser(removeUserId);
            userService.findAllUsers()
                .then(function(users){
                    model.users = users.data;
                });
        }

        function updateUser() {
            var userId = $routeParams["userId"];
            userService.updateUser(model.nonAdminUser, nonAdminUserId);
        }

        function unRegister() {
            var userId = $routeParams["userId"];
            userService.unRegister(userId);
            $location.url("/login");
        }


    }

})();
