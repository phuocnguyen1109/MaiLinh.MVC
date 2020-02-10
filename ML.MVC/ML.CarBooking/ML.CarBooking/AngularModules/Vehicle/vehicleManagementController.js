(function () {
    'use strict'
    angular.module('mainApp').controller('vehicleManagementController', vehicleManagementController);

    function vehicleManagementController($http, $rootScope, $scope, $state, $window) {
        var vm = this;
        vm.test = "Vehicle worked";
        vm.selectedVehicleMaster = {};
        vm.vehicleModel = {};
        vm.gotoEdit = gotoEdit;
        vm.initialize = initialize;
        vm.save = save;

        vm.changeVehicleMaster = changeVehicleMaster;


        function save() {
            $http.post('/api/Phuongtien/Create_New_PhuongTien', vm.vehicleModel)
                .then(function (response) {
                    $state.go('editVehicle', { id: response.data });

                });
        }

        function initialize() {
            getVehicleMasters();
            getAll_Phuongtien();
        }

        function getAll_Phuongtien() {
            $http.get('/api/PhuongTien/Get_List_PhuongTien')
                .then(reponse => {
                    vm.vehicles = reponse.data;
                });
        }

        function changeVehicleMaster() {
            vm.vehicleModel.DONGXE = vm.selectedVehicleMaster.DONGXE;
            vm.vehicleModel.HIEUXE = vm.selectedVehicleMaster.HIEUXE;
            vm.vehicleModel.DINHNGHIA_PT_ID = vm.selectedVehicleMaster.ID;
            vm.vehicleModel.VT_HIEUXE = vm.selectedVehicleMaster.VT_HIEUXE;
            vm.vehicleModel.THUTU = getVehicleNumber(vm.selectedVehicleMaster.HIEUXE);
            vm.vehicleModel.CODE = generateVehicleCode(vm.vehicleModel.HIEUXE, vm.selectedVehicleMaster.VT_HIEUXE, vm.vehicleModel.DOIXE_THANG, vm.vehicleModel.DOIXE_NAM, vm.vehicleModel.THUTU);
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
            if (!_year || !_month) return;
            let str_Month = _month >= 10 ? _month.toString() : (10 + _month).toString().substring(1);
            let str_Year =_year.toString().length != 4 ? 'XX' : _year.toString().substring(2);
            let str_Code = (10000 + _code).toString().substring(1);
            return (_type + _shortCS + str_Month + str_Year + str_Code).toUpperCase().replace(' ', '');
        }

        function gotoEdit() {
            let selectedVehicle = angular.copy(vm.vehicles).filter(x => x.selected);
            if (selectedVehicle.length == 1) {
                $state.go('editVehicle', { id: selectedVehicle[0].ID });
            }
           
        }

        function getVehicleMasters() {
            $http.get('/api/Dinhnghia_Phuongtien/GetAll_Dinhnghia_Phuongtien')
                .then(response => {
                    vm.all_VehicleMaster = response.data;
                });
        }

      
    }

})();