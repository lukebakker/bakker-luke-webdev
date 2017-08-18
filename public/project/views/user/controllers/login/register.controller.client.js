(function () {
    angular
        .module("DevApp")
        .controller("registerController", registerController);

    function registerController(userService, $location, albumService) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user) {
            var _verifyPassword = user.password === user.password1;
            var _user = user.username === userService.findUserByUsername(user.username);
            user = {username: user.username, password: user.password};
            if (!_verifyPassword) {
                model.errorMessage = "Passwords do not match"
            } else {
                if (!_user) {
                     userService.registerUser(user)
                        .then(function (user) {
                            _user = user.data;
                            albumService.addAlbumForUser(_user._id, "Favorites");
                            $location.url("/profile/" + _user._id);
                        });
                } else {
                    model.errorMessage = "User already exists";
                }
            }
            return _user;
        }
    }
})();