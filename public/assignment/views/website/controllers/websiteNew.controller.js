(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.createNewWebsite = createNewWebsite;

        function init() {
            websiteService.findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites.data;
                });
        }

        init();

        function createNewWebsite() {
            var website = {
                "name": model.name + "",
                "description": model.description + ""
            };
            websiteService.createWebsite(model.userId, website);
            $location.url("user/" + model.userId + "/website");
        }
    }
})();