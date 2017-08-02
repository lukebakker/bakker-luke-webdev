(function () {
    angular
        .module("sortable", [])
        .directive("sortDirective", sortDirective);

    function sortDirective() {
        function linkFunction(scope, element) {

            $(element).sortable();
        }

        return {
            link: linkFunction
        }

    }
})();