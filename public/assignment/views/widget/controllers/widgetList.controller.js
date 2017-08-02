(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var model = this;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;

        model.trustAsYoutubeSource = trustAsYoutubeSource;
        model.trustAsHtmlSource = trustAsHtmlSource;

        function init() {
            model.widgets12 = [
                {"type": "HEADINGS"},
                {"type": "IMAGES"},
                {"type": "YOUTUBE"},
                {"type": "HTML"}
            ];
            widgetService
                .findWidgetByPageId(model.userId, model.websiteId, model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }

        init();

        function trustAsYoutubeSource(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length - 1];
            console.log(youtubeUrl);
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function trustAsHtmlSource(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }


    }
})();