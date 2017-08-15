(function () {
    angular
        .module("DevApp")
        .factory("searchService", searchService);

    function searchService($http) {

        var api = {
            "searchDeviations": searchDeviations,
            "browseByTag": browseByTag,
            "findOneDeviation": findOneDeviation,
            "findMoreLikeThis": findMoreLikeThis
        };
        return api;

        function searchDeviations(key) {
            var url = "https://www.deviantart.com/api/v1/oauth2/browse/dailydeviations?access_token=" + key;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function browseByTag(key, tag) {
            var newTag = tag.replace(/\s/g, '');
            var url = "https://www.deviantart.com/api/v1/oauth2/browse/tags?tag=" + newTag + "&access_token=" + key;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findOneDeviation(key, deviationId) {
            var url = "https://www.deviantart.com/api/v1/oauth2/deviation/" + deviationId + "?access_token=" + key;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findMoreLikeThis(key, deviationId) {
            return findOneDeviation(key, deviationId)
                .then(function (deviation) {
                    var newCategory = deviation.category;
                    newCategory = newCategory.replace(/\s/g, '');
                    var url = "https://www.deviantart.com/api/v1/oauth2/browse/morelikethis?seed=" + deviationId + "&category=" + newCategory + "&access_token=" + key;
                    return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
                });

        }
    }


})();