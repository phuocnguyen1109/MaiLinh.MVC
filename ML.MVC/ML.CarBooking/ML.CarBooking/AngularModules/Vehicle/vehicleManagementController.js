(function () {
    'use strict'
    angular.module('mainApp').controller('vehicleManagementController', vehicleManagementController);

    function vehicleManagementController($rootScope, $scope, $state) {
        var vm = this;
        vm.test = "Vehicle worked";
        var selectedId;
        var tempVehicles = [];

        vm.gotoEdit = gotoEdit;
        vm.initialize = initialize;
        vm.rowClick = rowClick;
        vm.checkSelected = checkSelected;
        vm.filter = filter;

        function initialize() {
            vm.vehicles = [
                { id: 1, IsSelected: false, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, IsSelected: false, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, IsSelected: false, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' },
                { id: 1, IsSelected: false, brandName: 'VIOS E', seats: 7, productYear: 2015, color: 'Bạc', type: 'None', workingZone: 'TP.HCM', income: { incomeDate: '28/06/2015', incomeNote: '' }, outcome: { outcomeDate: '', outcomeNote: '' }, maintainKM: '' }];
        }

        function gotoEdit(vehicleId) {
            $state.go('editVehicle', { id: vehicleId });
        }

        function filter() {
            if (!vm.filterText || vm.filterText == '') {
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
    }

})();