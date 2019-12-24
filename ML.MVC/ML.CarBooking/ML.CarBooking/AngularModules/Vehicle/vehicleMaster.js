(function () {
    'use strict'
    angular.module('mainApp')
        .controller('vehicleMasterController', vehicleMasterController);

    vehicleMasterController.$inject = ['$uibModal', '$window'];

    function vehicleMasterController($uibModal, $window) {
        var vm = this;

        vm.add = add;
        vm.editVehicleMaster = editVehicleMaster;
        vm.deleteVehicleMaster = deleteVehicleMaster;

        vm.vehicleMasters = [];

        function initialize() {
            let str_VehicleMasters = $window.localStorage.getItem('Vehicle_Masters');
            vm.vehicleMasters = !str_VehicleMasters ? [] : JSON.parse(str_VehicleMasters);
        }
        initialize();

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
            alert('Chức năng đang được cập nhật');
        }

        function deleteVehicleMaster(row, $index) {
            alert('Chức năng đang được cập nhật');
        }

    }


})(); 