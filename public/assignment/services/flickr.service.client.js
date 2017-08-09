(function () {
    angular
        .module("WamApp")
        .factory("flickrService", flickrService);

    function flickrService($http, widgetService) {

        var api = {
            "searchPhotos": searchPhotos,
        };

        return api;

        function searchPhotos(searchTerm) {
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT"
            var key = "d0ff7694b51bb4e0290a840fc5ed6341";
            var secret = "6a108e67ed6bfd59";


            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();