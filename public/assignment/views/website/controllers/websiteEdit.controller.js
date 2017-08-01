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

        function init() {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.userId, model.websiteId)
                .then(function (website) {
                    model.website = website;
                });
        }

        init();

        function editWebsite() {
            websiteService.updateWebsite(model.userId, model.websiteId, model.website);
            $location.url("user/" + model.userId + "/website");
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.userId, model.websiteId);
            $location.url("user/" + model.userId + "/website")
        }

        function cancelClicked() {
            $location.url("user/" + model.userId + "/website");

        }

    }
})();