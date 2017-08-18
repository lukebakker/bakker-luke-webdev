(function () {

    angular
        .module("WamApp")
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
            // website routes
            .when("/user/:userId/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/edit", {
                templateUrl: "views/widget/editors/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/edit", {
                templateUrl: "views/widget/editors/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new/heading", {
                templateUrl: "views/widget/editors/widget-heading-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new/image", {
                templateUrl: "views/widget/editors/widget-image-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new/youtube", {
                templateUrl: "views/widget/editors/widget-youtube-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new/html", {
                templateUrl: "views/widget/editors/widget-html-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new/text", {
                templateUrl: "views/widget/editors/widget-text-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl: "views/widget/templates/widget-choose.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/edit/flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "flickrImageSearchController",
                controllerAs: "model"
            })

    }

})();

