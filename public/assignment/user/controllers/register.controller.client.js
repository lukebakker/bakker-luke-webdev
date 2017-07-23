(function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user) {
            var _verifyPassword = userService.verifyPassword(user.password, user.password1);
            var _user = userService.findUserByUsername(user.username);
            if (!_verifyPassword) {
                model.errorMessage = "Passwords do not match"
            } else {
                if (!_user) {
                    var user = userService.registerUser(user);
                    $location.url("/profile/" + user._id);

                } else {
                    model.errorMessage = "User already exists";
                }
            }
        }
    }
})();