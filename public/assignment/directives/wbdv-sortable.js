(function () {
    angular
        .module("sortable", [])
        .directive("sortDirective", sortDirective);

    function sortDirective($http) {
        function linkFunction(scope, element) {
            var start = -1;
            var end = -1;

            $(element).sortable({
                axis: 'y',
                handle: "lpb-handle",



                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    console.log([start, end]);

                    scope.setIndex({
                        start: start,
                        end: end
                    });

                }
            });
        }

        return {
            scope: {setIndex: '&'},
            link: linkFunction
        }
    }


})
();