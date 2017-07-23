(function () {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.editWebsite = editWebsite;
        model.deleteWebsite = deleteWebsite;
        model.cancelClicked = cancelClicked;
        var name;
        var description;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
            name = model.website.name;
            description = model.website.description;
        }

        init();

        function editWebsite(userId, website) {
            websiteService.updateWebsite(userId, website);
            $location.url("user/" + model.userId + "/website")
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url("user/" + model.userId + "/website")
        }

        function cancelClicked() {
            model.website.name = name;
            model.website.description = description;
            $location.url("user/" + model.userId + "/website");

        }

    }
})();