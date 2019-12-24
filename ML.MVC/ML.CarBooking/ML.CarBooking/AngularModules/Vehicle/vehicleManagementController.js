(function () {
    'use strict'
    angular.module('mainApp').controller('vehicleManagementController', vehicleManagementController);

    function vehicleManagementController($rootScope, $scope, $state, $window) {
        var vm = this;
        vm.test = "Vehicle worked";
        vm.selectedVehicleMaster = {};
        vm.vehicleModel = {};
        vm.gotoEdit = gotoEdit;
        vm.initialize = initialize;

        vm.changeVehicleMaster = changeVehicleMaster;


        function initialize() {
            getVehicleMasters();
            vm.vehicles = [
                { id: 1, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' }];
        }

        function changeVehicleMaster() {
            vm.vehicleModel.Brand = vm.selectedVehicleMaster.Brand;
            vm.vehicleModel.Type = vm.selectedVehicleMaster.Type;
            vm.vehicleModel.ShortCS = vm.selectedVehicleMaster.ShortCS;
            vm.vehicleModel.Number = getVehicleNumber(vm.selectedVehicleMaster.Brand);
            vm.vehicleModel.Code = generateVehicleCode(vm.vehicleModel.Type, vm.selectedVehicleMaster.ShortCS, vm.vehicleModel.Month, vm.vehicleModel.Year, vm.vehicleModel.Number);
        }

        function getVehicleNumber(_brand) {
            let str_vehicles = $window.localStorage.getItem('Vehicles');
            let vehicles = JSON.parse(str_vehicles);
            if (!vehicles) {
                return 1;
            }
            return vehicles.filter(x => x.Brand == _brand).length + 1;
        }

        function generateVehicleCode(_type, _shortCS, _month, _year, _code) {
            let str_Month = _month >= 10 ? _month.toString() : (10 + _month).toString().substring(1);
            let str_Year = _year.toString().length != 4 ? 'XX' : _year.toString().substring(2);
            let str_Code = (10000 + _code).toString().substring(1);
            return (_type + _shortCS + str_Month + str_Year + str_Code).toUpperCase().replace(' ', '');
        }

        function gotoEdit(vehicleId) {
            $state.go('editVehicle', { id: vehicleId });
        }

        function getVehicleMasters() {
            let str_v = $window.localStorage.getItem('Vehicle_Masters');
            vm.vehicleMasters = JSON.parse(str_v);
        }
    }

})();