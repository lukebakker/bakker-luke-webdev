(function () {
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.editPage = editPage;
        model.cancelClicked = cancelClicked;

        function init() {
            pageService
                .findPageByWebsiteId(model.userId, model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.userId, model.websiteId, model.pageId)
                .then(function (page) {
                    model.page = page;
                });
        }

        init();

        function editPage() {
            console.log("here");
            pageService.updatePage(model.userId, model.websiteId, model.pageId, model.page);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/");
        }

        function cancelClicked() {
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/");

        }

    }
})();