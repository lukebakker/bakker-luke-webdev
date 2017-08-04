(function () {
    angular
        .module("deviantApp", [])
        .controller("searchController", searchController)
        .service("searchService", searchService);

    function searchController(searchService) {
        var model = this;

        model.artworks = [];

        model.searchHot = searchHot;
        model.searchByTag = searchByTag;

        function init() {
            model.key = "897e0e080abf0db56ab7dd5019836a4f5b17cff63bf61fecd3"

        }

        init();

        function searchHot() {
            searchService
                .searchDeviations(model.key)
                .then(function (message) {
                    return model.artworks = message;
                });
            var art = model.artworks;
            var newList = [];
            for (var u in art) {
                for (var v in art[u]) {
                    newList.push(art[u][v]);
                }
            }
            model.showArt = newList;
        }

        function searchByTag(tag) {
            searchService
                .browseByTag(model.key, tag)
                .then(function (message) {
                    var newList = [];
                    var objects = (message.results);
                    console.log(objects);
                    for(var u in objects) {
                        newList.push(objects[u]);
                    }
                    return model.showArt = newList;
                });
        }
    }

    function searchService($http) {

        this.searchDeviations = searchDeviations;
        this.browseByTag = browseByTag;

        function searchDeviations(key) {
            var url = "https://www.deviantart.com/api/v1/oauth2/browse/dailydeviations?access_token=" + key;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function browseByTag(key, tag) {
            var url = "https://www.deviantart.com/api/v1/oauth2/browse/tags?tag=" + tag + "&access_token=" + key;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();