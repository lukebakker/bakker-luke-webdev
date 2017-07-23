(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService() {

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        var api = {
            "findWebsitesForUser": findWebsitesForUser,
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            websites.push(website);
            console.log(website);
            return websites;
        }

        function findWebsitesForUser(userId) {
            var sites = [];

            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }

            return sites;
        }


        function findWebsiteById(websiteId) {
            for (var u in websites) {
                if (websites[u]._id === websiteId) {
                    return websites[u];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var u in websites) {
                if (websites[u]._id === websiteId) {
                    websites[u] = website;
                }
            }
        }

        function deleteWebsite(websiteId) {
            var newList = [];
            for (var u in websites) {
                if (websites[u]._id !== websiteId) {
                    newList.push(websites[u]);
                }
            }
            websites = newList;
        }

    }
})();