(function () {
    angular
        .module("WamApp")
        .controller("flickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController($routeParams, widgetService, flickrService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.widgetId = $routeParams.widgetId;


        function init() {
            widgetService
                .findWidgetById(model.userId, model.websiteId, model.pageId, model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                });
            console.log("here");
        }

        init();


        model.searchPhotos = function (searchTerm) {
            console.log(searchTerm);
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }


})
();