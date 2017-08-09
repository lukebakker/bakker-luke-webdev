(function () {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.widgetId = $routeParams.widgetId;


        model.createNewHeader = createNewHeader;
        model.createNewImage = createNewImage;
        model.createNewYoutube = createNewYoutube;
        model.createNewHtml = createNewHtml;
        function init() {
            widgetService
                .findWidgetByPageId(model.userId, model.websiteId, model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });


        }

        init();

        function createNewHeader() {
            var newWidget = {
                "type": "HEADING",
                "pageId": model.pageId,
                "size": "",
                "text": ""
            };
            var widgetId = null;
            widgetService.createWidget(model.userId, model.websiteId, model.pageId, newWidget)
                .then(function (widget) {
                    widgetId = widget.data;
                    $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                        "/widget/" + widgetId + "/edit");
                });
        }

        function createNewImage() {
            var newWidget = {
                "type": "IMAGE",
                "pageId": model.pageId,
                "width": "",
                "url": ""
            };
            var widgetId = null;
            widgetService.createWidget(model.userId, model.websiteId, model.pageId, newWidget)
                .then(function (widget) {
                    widgetId = widget.data;
                    $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                        "/widget/" + widgetId + "/edit");
                });
        }

        function createNewYoutube() {
            var newWidget = {
                "type": "YOUTUBE",
                "pageId": model.pageId,
                "width": "",
                "url": ""
            };
            var widgetId = null;
            widgetService.createWidget(model.userId, model.websiteId, model.pageId, newWidget)
                .then(function (widget) {
                    widgetId = widget.data;
                    $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                        "/widget/" + widgetId + "/edit");
                });
        }

        function createNewHtml() {
            var newWidget = {
                "type": "HTML",
                "pageId": model.pageId
            };
            var widgetId = null;
            widgetService.createWidget(model.userId, model.websiteId, model.pageId, newWidget)
                .then(function (widget) {
                    widgetId = widget.data;
                    $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                        "/widget/" + widgetId + "/edit");
                });
        }
    }
})();