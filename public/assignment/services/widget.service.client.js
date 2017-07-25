(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService() {

        var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "findWidgetByPageId": findWidgetByPageId,
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(widget) {
            widgets.push(widget);
            return widget;
        }

        function findWidgetByPageId(pageId) {
            var newWidgets = [];

            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    newWidgets.push(widgets[w]);
                }
            }

            return newWidgets;
        }

        function findWidgetById(widgetId) {
            for (var u in widgets) {
                if (widgets[u]._id === widgetId) {
                    return widgets[u];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var u in widgets) {
                if (widgets[u]._id === widgetId) {
                    widgets[u] = widget;
                }
            }
            return widgets[u];
        }

        function deleteWidget(widgetId) {
            var newList = [];
            for (var u in widgets) {
                if (widgets[u]._id !== widgetId) {
                    newList.push(widgets[u]);
                }
            }
            widgets = newList;
        }
    }

})();