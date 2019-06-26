(function () {
    'use strict'
    angular.module('mainApp').controller('employeesController', employeesController);

    function employeesController($scope, $state) {
        var vm = this;
        vm.test = "employees worked";

        vm.gotoEdit = gotoEdit;

        function gotoEdit(employeeId) {
            $state.go('editEmployee', { id: employeeId });
        }
    }

})();