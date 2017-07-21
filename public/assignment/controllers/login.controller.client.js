/**
 * Created by lbakker on 7/17/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("loginController", loginController);


    function loginController($scope, $location, userService) {

        $scope.login = function (user) {
            var user = userService.findUsernameByUsernameAndPassword(user.username, user.password);
            if (user === null) {
                $scope.errorMessage = "Wrong username or password";

            } else {
                $location.url("profile/" + user._id);
            }
        }
    }

})();

