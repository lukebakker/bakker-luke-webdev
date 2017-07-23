(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService() {

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(userId, page) {
            pages.push(page);
            return pages;
        }

        function findPageByWebsiteId(websiteId) {
            var newPages = [];

            for (var w in pages) {
                if (pages[w].websiteId === websiteId) {
                    newPages.push(pages[w]);
                }
            }

            return newPages;
        }

        function findPageById(pageId) {
            for (var u in pages) {
                if (pages[u]._id === pageId) {
                    return pages[u];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var u in pages) {
                if (pages[u]._id === pageId) {
                    pages[u] = page;
                }
            }
        }

        function deletePage(pageId) {
            var newList = [];
            for (var u in pages) {
                if (pages[u]._id !== pageId) {
                    newList.push(pages[u]);
                }
            }
            pages = newList;
        }
    }

})();