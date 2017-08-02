(function () {
    angular
        .module("wbdv-sortable", [])
        .directive("sortDirective", sortDirective);

    function sortDirective() {
        console.log("here");
        function linkFunction(element) {
            console.log("nowHere");

            // var startIndex = -1;
            //var endIndex = -1;
            $(element).draggable();
            /*({
             start: function (event, ui) {
             startIndex = $(ui.item).index();
             },
             stop: function (event, ui) {
             endIndex = $(ui.item).index();
             console.log([startIndex, endIndex]);
             $http.put("/api/widget/123?start=" + startIndex + "&end=" + endIndex);
             }
             });*/
        }

        return {
            //templateUrl: "views/widget/templates/widget-list.view.client.html",
            link: linkFunction
        }

    }
})();