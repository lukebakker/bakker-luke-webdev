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

        model.createNewWidget = createNewWidget;
        model.cancel = cancel;
        model.deleteWidget = deleteWidget;

        function init() {
            widgetService
                .findWidgetById(model.userId, model.websiteId, model.pageId, model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                });
        }

        init();

        function createNewWidget() {
            widgetService.updateWidget(model.userId, model.websiteId, model.pageId, model.widgetId, model.widget);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget");
        }

        function cancel() {
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget");
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.userId, model.websiteId, model.pageId, model.widgetId);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                "/widget");
        }
    }


})
();