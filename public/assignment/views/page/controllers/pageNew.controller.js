(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;

        model.createNewPage = createNewPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }

        init();

        function createNewPage() {
            var page = {
                "_id": new Date().getTime() + "",
                "name": model.name + "",
                "websiteId": model.userId + "",
                "description": model.description + ""
            };
            pageService.createPage(model.userId, page);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

    }
})();