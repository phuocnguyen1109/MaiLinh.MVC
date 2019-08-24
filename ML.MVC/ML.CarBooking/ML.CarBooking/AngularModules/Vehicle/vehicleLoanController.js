(function () {
    'use strict'
    angular.module('mainApp').controller('vehicleLoanController', vehicleLoanController);
    vehicleLoanController.$inject = ['$http', '$rootScope', '$scope', '$state'];

    function vehicleLoanController($scope, $state, $http, $rootScope) {
        var vm = this;

        vm.initialize = initialize;

        function initialize() {
            vm.vehicleLoans = [
                {
                    employeeId: 'NV00001', employeeName: 'Nguyễn Hữu Phước', phoneNumber: '0344202279',
                    receive: { receivedDate: '25/06/2018', receivedTime: '08:30', receivedKM: '1300', receivedFuelId: 1, receivedFuel: '1/4' },
                    giveback: { givebackDate: '', givebackTime: '', givebackKM: '', givebackFuelId: 2, givebackFuel: '1/2' },
                    note: ''
                }
            ];

            vm.fuelLevels = [
                { lvId: 0, lvName: '0' },
                { lvId: 1, lvName: '1/4' },
                { lvId: 2, lvName: '1/2' },
                { lvId: 3, lvName: '1' },
            ];
        }

        //function getAllVehicleLoans() {
        //    $http.get('/api/Vehicle/GetAllVehicleLoans')
        //        .then(function (result) {
        //            vm.vehicleLoans = result.data;
        //        });
        //}
    }
})();