(function () {
    angular
        .module("sortable", [])
        .directive("sortDirective", sortDirective);

    function sortDirective($http) {
        function linkFunction(scope, element, $routeParams) {
            var userId = $routeParams.userId;
            var pageId = $routeParams.pageId;
            var websiteId = $routeParams.websiteId;
            var startIndex = -1;
            var endIndex = -1;

            $(element).sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);

                    scope.setIndex({
                        startIndex: startIndex,
                        endIndex: endIndex
                    });

                }
            });
        }

        return {
            scope:
                {setIndex: '&'},
            link: linkFunction
        }
    }


})
();