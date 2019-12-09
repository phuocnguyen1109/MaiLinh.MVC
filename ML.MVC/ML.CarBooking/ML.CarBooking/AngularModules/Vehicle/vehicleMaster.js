(function () {
    'use strict'
    angular.module('mainApp')
        .controller('vehicleMasterController', vehicleMasterController);

    vehicleMasterController.$inject = ['$uibModal'];

    function vehicleMasterController($uibModal) {
        var vm = this;

        vm.add = add;
        vm.editVehicleMaster = editVehicleMaster;
        vm.deleteVehicleMaster = deleteVehicleMaster;

        vm.vehicleMasters = [];

        function add() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'AngularModules/Vehicle/Templates/VehicleMaster/addModal.html',
                controller: 'addVehicleMasterController',
                controllerAs: 'vm',
                keyboard: false,
                resolve: {

                },
            });
            modalInstance.result.then(function (result) {
                if (result.Id == 0) {
                    vm.vehicleMasters.push(result);
                }
            });
        }

        function editVehicleMaster(row, $index) {
            console.log('edit');
        }

        function deleteVehicleMaster(row, $index) {
            console.log('delete');
        }

    }


})(); 