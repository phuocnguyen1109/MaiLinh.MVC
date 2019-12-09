(function () {
    'use strict'
    angular.module('mainApp')
        .controller('addVehicleMasterController', addVehicleMasterController);

    function addVehicleMasterController($uibModalInstance) {
        var vm = this;

        vm.initialize = initialize;
        vm.close = close;
        vm.add = add;
        vm.isValid = isValid;

        vm.isExisting = false;

        function initialize() {
            _resetModel();


        }

        function isValid()
        {
            if (vm.vehicleMaster.Type
                && vm.vehicleMaster.Brand
                && vm.vehicleMaster.ShortType
                && vm.vehicleMaster.ShortCS) {
                return true;
            }
            return false;
        }

        function _resetModel() {
            vm.vehicleMaster = {
                Id: 0, 
                Type: null,
                Brand: null,
                ShortType: null,
                ShortCS: null
            }
        }



        function close() {
            _resetModel();
            $uibModalInstance.dismiss('close');
        }

        function add() {
            $uibModalInstance.close(vm.vehicleMaster);
        }
    }
}
    )();