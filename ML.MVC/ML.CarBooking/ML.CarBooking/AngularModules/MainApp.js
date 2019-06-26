(function () {
    'use strict'
    var app = angular.module('mainApp', ['ui.router', 'ui.bootstrap']);

    app.controller('mainController', mainController);

    function mainController($scope, $state, $stateParams) {
        var vm = this;

        vm.gotoEmployees = gotoEmployees;

        function gotoEmployees() {
            $state.go('employees');
        }
    }
})();