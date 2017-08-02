(function () {
    angular
        .module("sortable", [])
        .directive("sortDirective", sortDirective);

    function sortDirective() {
        console.log("here");
        function linkFunction(scope, element) {

            // var startIndex = -1;
            //var endIndex = -1;
            $(element).sortable();
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
            link: linkFunction
        }

    }
})();