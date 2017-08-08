(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService($http) {

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, userId, page) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function findPageByWebsiteId(userId, websiteId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(userId, websiteId, pageId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(userId, websiteId, pageId, page) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(userId, websiteId, pageId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId;
            return $http.delete(url, pageId);
        }
    }

})();