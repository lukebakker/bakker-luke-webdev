(function () {

    angular
        .module("DevApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/profile/:userId/home/albums", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "albumController",
                controllerAs: "model"
            })


    }
})();
