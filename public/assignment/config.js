(function () {

    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            // website routes
            .when("/user/:userId/website", {
                templateUrl: "website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl: "page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page/pageId/widget", {
                templateUrl: "widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page/pageId/widget/new", {
                templateUrl: "widget-new.view.client.html",
                controller: "widgetNewController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page/pageId/widget/:widgetId", {
                templateUrl: "widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs:"model"
            })

    }
})();

