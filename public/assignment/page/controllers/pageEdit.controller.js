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
        var name;
        var description;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
            name = model.page.name;
            description = model.page.description;
        }

        init();

        function editPage() {
            pageService.updatePage(model.pageId, model.page);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

        function cancelClicked() {
            model.page.name = name;
            model.page.description = description;
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");

        }

    }
})();