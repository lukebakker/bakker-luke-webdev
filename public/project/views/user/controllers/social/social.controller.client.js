(function () {
    angular
        .module("DevApp")
        .controller("socialController", socialController);


    function socialController(imageService, $routeParams, userService, $location, albumService) {
        var model = this;
        model.userId = $routeParams["userId"];

        model.searchUser = searchUser;
        model.follow = follow;


        function init() {
            var promise = userService.findUserById(model.userId);
            promise.then(function (response) {
                model.user = response.data;
                model.followers = model.user.followers;
                model.following = model.user.following;
            });

        }

        init();


        function searchUser(username) {
            console.log("here");
            return userService.findUserByUsername(username)
                .then(function (user) {
                    console.log(user.data);
                    model.findFollowers = user.data;
                });

        }

        function follow(username) {

            return userService.findUserByUsername(username)
                .then(function (user) {
                    user.data[0].followers.push(model.userId);
                    userService.updateUser(user.data[0], user.data[0]._id)
                        .then(function (data) {
                            model.user.following.push(user.data[0]._id);
                            userService.updateUser(model.user, model.userId);
                            model.following = model.user.following;
                            model.followers = model.user.followers;
                        });
                });
        }
    }
})();