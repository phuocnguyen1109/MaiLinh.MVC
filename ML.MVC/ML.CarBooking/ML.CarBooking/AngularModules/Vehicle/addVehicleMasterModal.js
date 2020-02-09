(function () {
    'use strict'
    angular.module('mainApp')
        .controller('addVehicleMasterController', addVehicleMasterController);

    function addVehicleMasterController($http, $uibModalInstance, $window, model) {
        var vm = this;
        vm.initialize = initialize;
        vm.close = close;
        vm.add = add;
        vm.isValid = isValid;

        vm.isExisting = false;

        function initialize() {
            vm.title = model ? "Sửa Định Nghĩa Phương Tiện" : "Thêm Định Nghĩa Phương Tiện";
            if (model) {
                vm.vehicleMaster = model;
            }
            else {
                _resetModel();
            }
        }

        function isValid()
        {
            if (vm.vehicleMaster.DONGXE
                && vm.vehicleMaster.HIEUXE
                && vm.vehicleMaster.VT_DONGXE
                && vm.vehicleMaster.VT_HIEUXE) {
                return true;
            }
            return false;
        }

        function _resetModel() {
            vm.vehicleMaster = {
                ID: 0, 
                HIEUXE: null,
                DONGXE: null,
                VT_DONGXE: null,
                VT_HIEUXE: null,
                IS_DELETED: false
            }
        }



        function close() {
            _resetModel();
            $uibModalInstance.dismiss();
        }

        function add() {
            $http.post('/api/Dinhnghia_Phuongtien/CreateOrUpdate_Dinhnghia_Phuongtien', vm.vehicleMaster)
                .then(reponse => {
                    vm.vehicleMaster.ID = reponse.data;
                    $uibModalInstance.close(vm.vehicleMaster);
                });
            
        }
    }
}
    )();