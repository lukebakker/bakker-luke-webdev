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
        model.widget = widgetService.findWidgetById(model.widgetId);


        model.createNewHeader = createNewHeader;
        model.createNewImage = createNewImage;
        model.createNewYoutube = createNewYoutube;

        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);
        }

        init();

        function createNewHeader() {
            var newWidget = {
                "_id": new Date().getTime() + "",
                "widgetType": "HEADING",
                "pageId": model.pageId,
                "size": "",
                "text": ""
            };
            widgetService.createWidget(newWidget);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget/" + newWidget._id + "/edit");
        }

        function createNewImage() {
            var newWidget = {
                "_id": new Date().getTime() + "",
                "widgetType": "IMAGE",
                "pageId": model.pageId,
                "width": "",
                "url": ""
            };
            widgetService.createWidget(newWidget);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget/" + newWidget._id + "/edit");
        }

        function createNewYoutube() {
            var newWidget = {
                "_id": new Date().getTime() + "",
                "widgetType": "YOUTUBE",
                "pageId": model.pageId,
                "width": "",
                "url": ""
            };
            widgetService.createWidget(newWidget);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget/" + newWidget._id + "/edit");
        }
    }
})();