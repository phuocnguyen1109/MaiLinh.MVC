(function () {
    'use strict'
    angular.module('mainApp').controller('employeesController', employeesController);

    function employeesController($rootScope , $scope, $state) {
        var vm = this;
        vm.test = "employees worked";

        vm.gotoEdit = gotoEdit;
        vm.initialize = initialize;

        function initialize(){
            vm.employees = $scope.$parent.vm.employees;

        }

        function gotoEdit(employeeId) {
            $state.go('editEmployee', { id: employeeId });
        }
    }

})();