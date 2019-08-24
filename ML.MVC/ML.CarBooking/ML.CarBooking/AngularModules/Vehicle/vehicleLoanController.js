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
                    receive: { receivedDate: '25/06/2018', receivedTime: '08:30', receivedKM: '1300', receivedFuel: '' },
                    giveback: { givebackDate: '', givebackTime: '', givebackKM: '', givebackFuel: '' },
                    note: ''
                }
            ]
        }

        //function getAllVehicleLoans() {
        //    $http.get('/api/Vehicle/GetAllVehicleLoans')
        //        .then(function (result) {
        //            vm.vehicleLoans = result.data;
        //        });
        //}
    }
})();