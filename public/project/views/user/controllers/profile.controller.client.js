(function () {

    angular
        .module("DevApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unRegister = unRegister;

        function init() {
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
                for (var u in model.user.followers) {
                    console.log(model.user.followers[u].username);
                }
            });


        }

        init();

        function updateUser() {
            var userId = $routeParams["userId"];
            userService.updateUser(model.user, userId);
        }

        function unRegister() {
            var userId = $routeParams["userId"];
            userService.unRegister(userId);
            $location.url("/login");
        }


    }

})();
