(function () {
    'use strict'
    angular.module('mainApp')
        .controller('vehicleMasterController', vehicleMasterController);

    vehicleMasterController.$inject = ['$http', '$uibModal', '$window'];

    function vehicleMasterController($http, $uibModal, $window) {
        var vm = this;


        vm.allDinhnghia_phuongtien = [];

        vm.add = add;
        vm.editVehicleMaster = editVehicleMaster;
        vm.deleteVehicleMaster = deleteVehicleMaster;

        vm.vehicleMasters = [];

        function initialize() {
            getAll_Dinhnghia_Phuongtien();
        }
        initialize();

        function getAll_Dinhnghia_Phuongtien() {
            $http.get('/api/Dinhnghia_Phuongtien/GetAll_Dinhnghia_Phuongtien')
                .then(response => {
                    vm.allDinhnghia_phuongtien = response.data;
                });
        }

        function add() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'AngularModules/Vehicle/Templates/VehicleMaster/addModal.html',
                controller: 'addVehicleMasterController',
                controllerAs: 'vm',
                keyboard: false,
                resolve: {
                    model: null
                },
            });
            modalInstance.result.then(function (result) {
                getAll_Dinhnghia_Phuongtien();
            });
        }

        function editVehicleMaster(row, $index) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'AngularModules/Vehicle/Templates/VehicleMaster/addModal.html',
                controller: 'addVehicleMasterController',
                controllerAs: 'vm',
                keyboard: false,
                resolve: {
                    model : row

                },
            });
            modalInstance.result.then(function (result) {
                getAll_Dinhnghia_Phuongtien();
            });
        }

        function deleteVehicleMaster(row, $index) {
            row.IS_DELETED = true;
            $http.post('/api/Dinhnghia_Phuongtien/CreateOrUpdate_Dinhnghia_Phuongtien', row)
                .then(response => {
                    getAll_Dinhnghia_Phuongtien();
                });
        }

    }


})(); 