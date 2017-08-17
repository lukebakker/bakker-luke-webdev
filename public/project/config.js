(function () {

    angular
        .module("DevApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/templates/login/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/login/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "views/user/templates/login/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home/albums", {
                templateUrl: "views/user/templates/album/album.view.client.html",
                controller: "albumController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home/albums/new", {
                templateUrl: "views/user/templates/album/album.new.view.client.html",
                controller: "albumNewController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home/albums/:albumId", {
                templateUrl: "views/user/templates/album/single.album.view.client.html",
                controller: "singleAlbumController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home/albums/:albumId/edit", {
                templateUrl: "views/user/templates/album/album.edit.view.client.html",
                controller: "albumEditController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home/albums/:albumId/edit/:imageId", {
                templateUrl: "views/user/templates/album/album.selector.view.client.html",
                controller: "imageAddController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home/follow", {
                templateUrl: "views/user/templates/social/find.followers.view.client.html",
                controller: "socialController",
                controllerAs: "model"
            })
            .when("/user/:userId/view/:imageId/details", {
                templateUrl: "views/user/templates/album/image.detail.view.client.html",
                controller: "imageDetailController",
                controllerAs: "model"
            })
            .when("/user/:userId/view/:followerId/albums", {
                templateUrl: "views/user/templates/album/view.only.album.view.client.html",
                controller: "albumController",
                controllerAs: "model"
            })


    }
})();
