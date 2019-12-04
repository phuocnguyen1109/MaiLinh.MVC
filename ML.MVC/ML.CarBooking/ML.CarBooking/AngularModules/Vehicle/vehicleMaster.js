(function () {
    'use strict'
    angular.module('mainApp')
        .controller('vehicleMasterController', vehicleMasterController);

    vehicleMasterController.$inject = ['$uibModal'];

    function vehicleMasterController($uibModal) {
        var vm = this;

        vm.add = add;

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
            modalInstance.result.then(function () {
                alert("now I'll close the modal");
            });
        }

    }


})(); 