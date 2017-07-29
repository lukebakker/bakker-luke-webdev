(function () {

    angular
        .module("WamApp")
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
            });
        }

        init();

        function updateUser(user) {
            var userId = $routeParams["userId"];
            userService.updateUser(user, userId);
        }

        function unRegister() {
            var userId = $routeParams["userId"];
            userService.unRegister(userId);
            $location.url("/login");
        }

    }

})();

