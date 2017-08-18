(function () {
    angular
        .module("DevApp")
        .controller("socialController", socialController);


    function socialController(imageService, $routeParams, userService, $location, albumService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.searchUser = searchUser;
        model.follow = follow;
        model.findFollow = null;
        model.unFollow = unFollow;
        model.unFollowed = unFollowed;


        function init() {
            var promise = userService.findUserById(model.userId);
            promise.then(function (response) {
                model.user = response.data;
                userService.findFollowing(model.user._id)
                    .then(function (following) {
                        model.following = following.data.following;
                        userService.findFollowers(model.user._id)
                            .then(function (followers) {
                                model.followers = followers.data.followers;
                            });
                    });
            });

        }

        init();


        function searchUser(username) {
            return userService.findUserByUsername(username)
                .then(function (user) {
                    model.findFollow = user.data;
                });

        }

        function follow(username) {

            return userService.findUserByUsername(username)
                .then(function (user) {
                    user.data.followers.push(model.userId);
                    userService.updateUser(user.data, user.data._id)
                        .then(function (data) {
                            model.user.following.push(user.data._id);
                            userService.updateUser(model.user, model.userId);

                            userService.findUserById(model.userId)
                                .then(function (user) {
                                    console.log(user.data);
                                    model.following = user.data.following;
                                })
                        });
                });

        }

        function unFollow(unFollowId) {
            return userService.unFollow(model.user._id, unFollowId)
                .then(function (result) {
                    userService.findFollowing(model.user._id)
                        .then(function (following) {
                            model.following = following.data.following;
                            userService.findFollowers(model.user._id)
                                .then(function (followers) {
                                    model.followers = followers.data.followers;
                                });
                        });
                })
        }

        function unFollowed(unFollowId) {
            return userService.unFollowed(model.user._id, unFollowId)
                .then(function (result) {
                    userService.findFollowing(model.user._id)
                        .then(function (following) {
                            model.following = following.data.following;
                            userService.findFollowers(model.user._id)
                                .then(function (followers) {
                                    model.followers = followers.data.followers;
                                });
                        });
                })
        }
    }
})();