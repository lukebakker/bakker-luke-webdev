(function () {
    angular
        .module("myDirectives", [])
        .directive("itemList", itemListDirective);

    function itemListDirective() {
        function linkFunction(scope, element) {
           $(element).sortable();
        }
        return {
            link: linkFunction
        }
    }


})();