(function () {
    'use strict'
    angular.module('mainApp').controller('employeeInfoController', employeeInfoController);

    employeeInfoController.$inject = ['$http', '$rootScope', '$scope', '$state'];
    function employeeInfoController($http, $rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;

        function initialize() {
            
        }
    };
})();