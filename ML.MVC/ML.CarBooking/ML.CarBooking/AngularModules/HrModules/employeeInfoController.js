(function () {
    'use strict'
    angular.module('mainApp').controller('employeeInfoController', employeeInfoController);

    employeeInfoController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams'];
    function employeeInfoController($rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;

        vm.IsViewing = $stateParams.params.IsViewing;

        function initialize() {

   
        }

       
    }
})();