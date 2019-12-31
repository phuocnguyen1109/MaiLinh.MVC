(function () {
    'use strict'
    angular.module('mainApp')
        .controller('addVehicleMasterController', addVehicleMasterController);

    function addVehicleMasterController($uibModalInstance, $window) {
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
            let str_vehicleMasters = $window.localStorage.getItem('Vehicle_Masters');
            let vehicleMasters = JSON.parse(str_vehicleMasters);
            if (!str_vehicleMasters) {
                $window.localStorage.setItem('Vehicle_Masters', JSON.stringify([vm.vehicleMaster]));
            } else {
                vehicleMasters.push(vm.vehicleMaster);
                $window.localStorage.setItem('Vehicle_Masters', JSON.stringify(vehicleMasters));
            }
            $uibModalInstance.close(vm.vehicleMaster);
        }
    }
}
    )();