(function () {
    'use strict'
    angular.module('mainApp')
        .controller('addVehicleMasterController', addVehicleMasterController);

    function addVehicleMasterController($uibModalInstance) {
        var vm = this;

        vm.close = close;

        function close() {
            $uibModalInstance.close();
        }
    }
}
    )();