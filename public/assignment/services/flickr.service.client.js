(function () {
    angular
        .module("WamApp")
        .service("flickrService", flickrService);

    function flickrService($http) {

        var api = {
            "searchPhotos": searchPhotos,
            "selectPhoto": selectPhoto
        };

        var key = "d0ff7694b51bb4e0290a840fc5ed6341";
        var secret = "6a108e67ed6bfd59";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function selectPhoto(photo, websiteId, pageId, widgetId) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .updateWidget(websiteId, pageId, widgetId, {url: url})
                .then()
            ;
        }
    }
});