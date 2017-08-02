(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http) {

        var api = {
            "findWidgetByPageId": findWidgetByPageId,
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "setIndex": setIndex
        };
        return api;

        function createWidget(userId, websiteId, pageId, widget) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new";
            $http.post(url, widget);
        }

        function findWidgetByPageId(userId, websiteId, pageId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(userId, websiteId, pageId, widgetId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId + "/edit";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(userId, websiteId, pageId, widgetId, widget) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId + "/edit";
            return $http.put(url, widget);
        }

        function deleteWidget(userId, websiteId, pageId, widgetId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId + "/edit";
            return $http.delete(url, widgetId);
        }

        function setIndex(pageId, start, end) {
            var url = "/api/page/"+pageId+"/?start="+start+"&end="+end;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }


    }

})
();