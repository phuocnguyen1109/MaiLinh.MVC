(function () {
    'use strict'
    angular.module('mainApp').controller('vehicleFuelManagementController', vehicleFuelManagementController);

    function vehicleFuelManagementController($rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;

        function initialize() {
            getVehicleFuels();

        }

        function getVehicleFuels() {
            //TODO: get data by api
            vm.vehicleFuels = [
                { id: 1, litresQuota: 0.2, fuelTypeQuota: 'RON95', chargedDate: '15/07/2019', starKM: '13092', endKM: '14112', fuelType: 'RON95', litres: 60, gasStation: 'HÓC MÔN 01', diver:'NGUYỄN HỮU PHƯỚC', note:'' },
            ]
        }

    }

})();