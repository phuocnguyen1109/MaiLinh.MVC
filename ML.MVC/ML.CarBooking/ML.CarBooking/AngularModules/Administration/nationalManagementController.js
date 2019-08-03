(function () {
    'use strict'
    angular.module('mainApp').controller('nationalManagementController', nationalManagementController);

    function nationalManagementController($scope, $state, $uibModal) {
        var vm = this;
        var selectedId;

        vm.initialize = initialize;
        vm.rowClick = rowClick;
        vm.checkSelected = checkSelected;
        vm.filterNational = filterNational;
        vm.gotoEdit = gotoEdit;
        vm.remove = remove;

        var userId = $state.params.id;
        vm.selectedItem = 1;
        vm.selectedNational = 0;
        

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
                { IsSelected: false, Id: 5, Name: "Hồ Chí Minh", ParentId:1, Type: 1}
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

        function gotoEdit() {
           
            //$state.go('editNational', { id: selectedId });
        }

        function remove() {

        }
    }
})();