(function () {
    'use strict'
    angular.module('mainApp').controller('vehicleManagementController', vehicleManagementController);

    function vehicleManagementController($rootScope, $scope, $state) {
        var vm = this;
        vm.test = "Vehicle worked";

        vm.gotoEdit = gotoEdit;
        vm.initialize = initialize;

        function initialize() {
            vm.vehicles = [
                { id: 1, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' }];
        }

        function gotoEdit(vehicleId) {
            $state.go('editVehicle', { id: vehicleId });
        }
    }

})();