(function () {
    'use strict'
    angular.module('mainApp').controller('nationalManagementController', nationalManagementController);

    function nationalManagementController($scope, $state, $uibModal, $log, $document) {
        var vm = this;
        var selectedId;

        vm.initialize = initialize;
        vm.rowClick = rowClick;
        vm.checkSelected = checkSelected;
        vm.filterNational = filterNational;
        vm.add = add;
        vm.addNewNational = addNewNational;
        vm.gotoEdit = gotoEdit;
        vm.remove = remove;

        var userId = $state.params.id;
        vm.selectedItem = 1;
        vm.selectedNational = 0;
        vm.listNewNational = [];
        vm.isBlank = true;

        function initialize() {
            //getNational();
            vm.types = [
                { typeId: 0, name: "Quốc Gia" },
                { typeId: 1, name: "Thành Phố" },
                { typeId: 2, name: "Quận, Huyện" }
            ]

            vm.nationals = [
                { nationId: 0, name: 'Việt Nam' },
                { nationId: 1, name: 'Thái Lan' },
                { nationId: 2, name: 'Malaysia' }
            ];

            vm.citys = [
                { IsSelected: false, Id: 5, Name: "Hồ Chí Minh", ParentId: 0, ParentName: "Việt Nam", Type: 1, TypeName: "Thanh Phố"}
            ]
        }

        //function getNational() {
        //    //TO DO: get api here
        //    if (!userId) {
        //        return;
        //    }
            
        //}

        function filterNational() {

        }

        function rowClick(row) {
            if (row) {
                row.IsSelected = !row.IsSelected;
                checkSelected();
            }
        }

        function checkSelected() {
            var selectedIds = angular.copy(vm.citys).filter(function (item) {
                return item.IsSelected;
            });

            if (selectedIds.length == 1) {
                selectedId = selectedIds[0].Id;
                vm.CanEdit = true;
                return;
            }

            vm.CanEdit = false;
        }

        function resetModel() {
            vm.nationalModel = {
                Id: 0,
                Name: '',
                ParentId: null,
                Type: null
            };
        }

        function add() {
            vm.modalTitle = "Thêm mới";
            resetModel();
            vm.isValid = false;
        }

        function addNewNational(row) {
            console.log(row);
        }

        function gotoEdit() {
            resetModel();
            vm.modalTitle = "Chỉnh sửa";
            vm.citys.forEach(function (item) {
                if (item.IsSelected == true)
                    return vm.nationalModel = item;
            });

            console.log(vm.nationalModel);
            vm.isBlank = false;
        }

        function remove() {

        }
    }
})();