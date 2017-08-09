(function () {
    angular
        .module("WamApp")
        .controller("flickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController($routeParams, widgetService, flickrService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.widgetId = $routeParams.widgetId;
        model.photos = [];
        model.selectPhoto = selectPhoto;


        function init() {
            widgetService
                .findWidgetById(model.userId, model.websiteId, model.pageId, model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                });
        }

        init();


        model.searchPhotos = function (searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        };

        function selectPhoto(photo) {
            var key = "d0ff7694b51bb4e0290a840fc5ed6341";
            var secret = "6a108e67ed6bfd59";

            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                "_id": model.widgetId, "type": 'IMAGE', "pageId": model.pageId,
                "width": 100, "size": 0, "text": "", "url": url
            };
            widgetService
                .updateWidget(model.userId, model.websiteId, model.pageId, model.widgetId, widget)
                .then(function (update) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                        "/widget");
                });
        }


    }


})();