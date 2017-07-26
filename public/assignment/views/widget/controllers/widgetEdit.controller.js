(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.widgetId = $routeParams.widgetId;
        model.widget = widgetService.findWidgetById(model.widgetId);

        model.createNewWidget = createNewWidget;
        model.cancel = cancel;
        model.deleteWidget = deleteWidget;

        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);

        }

        init();

        function createNewWidget() {
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget");
            console.log(model.widgets)
        }

        function cancel() {
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget");
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget");
        }
    }


})
();