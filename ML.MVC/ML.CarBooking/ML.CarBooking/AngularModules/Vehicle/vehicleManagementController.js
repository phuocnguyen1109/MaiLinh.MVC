(function () {
    'use strict'
    angular.module('mainApp').controller('vehicleManagementController', vehicleManagementController);

    function vehicleManagementController($rootScope, $scope, $state, $http) {
        var vm = this;
        vm.test = "Vehicle worked";
        var selectedId;
        var tempVehicles = [];

        vm.checkCreateValid = false;

        vm.gotoEdit = gotoEdit;
        vm.initialize = initialize;
        vm.rowClick = rowClick;
        vm.checkSelected = checkSelected;
        vm.filter = filter;
        vm.openCreateModal = openCreateModal;
        vm.checkValidCreate = checkValidCreate;
        vm.createSimpleVehicle = createSimpleVehicle;

        function initialize() {
            vm.vehicles = [
                { id: 1, IsSelected: false, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, IsSelected: false, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, IsSelected: false, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, IsSelected: false, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' }];

            tempVehicles = angular.copy(vm.vehicles);
        }

        //function getVehicles() {
        //    $http.get('/api/Vehicle/GetAllVehicles')
        //        .then(function (result) {
        //            vm.vehicles = result.data;

        //            tempVehicles = angular.copy(vm.vehicles);
        //        });
        //}

        function gotoEdit(vehicleId) {
            $state.go('editVehicle', { id: vehicleId });
        }

        function filter() {
            if (!vm.filterText && vm.filterText == '') {
                vm.vehicles = tempVehicles;
                return;
            }
            vm.vehicles = vm.vehicles.filter(function (item) {
                return item.brandName.includes(vm.filterText) || item.workingZone.includes(vm.filterText)
            });
        }

        function rowClick(row) {
            if (row) {
                row.IsSelected = !row.IsSelected;
                checkSelected();
            }
        }

        function checkSelected() {
            //debugger;
            var selectedIds = angular.copy(vm.vehicles).filter(function (item) {
                return item.IsSelected;
            });

            if (selectedIds.length >= 1) {
                if (selectedIds.length == 1) {
                    selectedId = selectedIds[0].Id;
                    vm.CanEdit = true;
                } else {
                    vm.CanEdit = false;
                }
                vm.CanDelete = true;
                vm.deleteRows = selectedIds;
                console.log(vm.deleteRows);
                return;
            }

            vm.CanEdit = false;
            vm.CanDelete = false;
        }

        function resetModel() {
            vm.createModel = {
                id: null,
                IsSelected: false,
                brandName: null,
                color: null,
                productYear: null,
                seats: null,
                type: null,
                workingZone: null,
                income: { incomeDate: '24/08/2016', incomeNote: '' },
                outcome: { outcomeDate: '', outcomeNote: '' },
                maintainKM: '',
            };
        }

        function openCreateModal() {
            resetModel();
        }

        function checkValidCreate() {
            if (!vm.createModel.brandName && vm.createModel.brandName != ''
                || !vm.createModel.color && vm.createModel.color != ''
                || !vm.createModel.productYear && vm.createModel.productYear != ''
                || !vm.createModel.seats && vm.createModel.seats != ''
                || !vm.createModel.workingZone && vm.createModel.workingZone != '') {
                vm.message = "Cần Nhập Đẩy Đủ Thông Tin";
                vm.checkCreateValid = false;
                return;
            }
            vm.checkCreateValid = true;
            vm.message = null;
        }

        function createSimpleVehicle() {
            if (!vm.checkCreateValid) {
                return;
            }

            vm.vehicles.push(vm.createModel);

            //$http.post('/api/Vehicle/CreateSimple', vm.createModel)
            //    .then(function (result) {
            //        if (result.data) {
            //            $state.go('editVehicle', { id: result.data });
            //        }
            //    });

        }
    }

})();