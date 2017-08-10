(function () {
    angular
        .module("DevApp")
        .controller("searchController", searchController);


    function searchController(searchService, $routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.artworks = [];

        model.searchHot = searchHot;
        model.searchByTag = searchByTag;

        function init() {
            model.key = "215045c2ad1723fea010f02537b65fc83688968c034de75c40";
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
            });
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
                    for (var u in objects) {
                        newList.push(objects[u]);
                    }
                    return model.showArt = newList;
                });
        }
    }
})();