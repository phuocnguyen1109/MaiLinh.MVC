(function () {
    'use strict'
    angular.module('mainApp')
        .controller('editEmployeeController', editEmployeeController);

    function editEmployeeController($scope, $state) {
        var vm = this;

        vm.test = 'Edit employee work ' + $state.params.id;
    }
})();