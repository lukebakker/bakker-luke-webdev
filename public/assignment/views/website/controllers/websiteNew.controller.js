(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.createNewWebsite = createNewWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }

        init();

        function createNewWebsite() {
            var website = {
                "_id": new Date().getTime() + "",
                "name": model.name + "",
                "developerId": model.userId + "",
                "description": model.description + ""
            };
            websiteService.createWebsite(model.userId, website);
            $location.url("user/" + model.userId + "/website");
        }
    }
})();