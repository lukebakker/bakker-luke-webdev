(function () {
    angular
        .module("myDirectives", [])
        .directive("itemList", itemListDirective);

    function itemListDirective() {
        function linkFunction(scope, element) {
           $(element).sortable();
        }
        return {
            templateUrl: "widget-list.html",
            link: linkFunction
        }
    }


})();