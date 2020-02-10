(function () {
    'use strict'
    angular.module('mainApp').controller('editVehicleController', editVehicleController);

    function editVehicleController($http, $rootScope, $scope, $state) {
        var vm = this;
        vm.phuongtien_Id = $state.params.id;
        vm.gotoEdit = gotoEdit;
        vm.initialize = initialize;
        vm.save = save;
        vm.thongtin_Phuongtien = {};

        function get_Thongtien_Phuongtien() {
            $http.get('/api/PhuongTien/Get_ThongTin_PhuongTien', { params: { id: vm.phuongtien_Id } })
                .then(reponse => {
                    vm.thongtin_Phuongtien.PHUONGTIEN = reponse.data.PHUONGTIEN;
                    vm.thongtin_Phuongtien.GIAYTOXE = reponse.data.GIAYTOXE ? reponse.data.GIAYTOXE : {};
                    vm.thongtin_Phuongtien.GIAYTOXE.ID_PHUONGTIEN = vm.phuongtien_Id;
                    vm.thongtin_Phuongtien.TRANGTHIETBI = reponse.data.TRANGTHIETBI;

                    vm.equipments = generateTrangThietBiList();
                });
        }

        function getMasterData() {
            vm.dk_NganHang = VH.DANGKY_NH;
            vm.TRANGTHIETBI = VH.TRANGTHIETBI;
            vm.YEUCAU_TTB = VH.YEUCAU_TTB;
            vm.BAIXE = VH.BAIXE;
            vm.VUNGHOATDONG = VH.VUNGHOATDONG;
            vm.CONGSUAT = VH.CONGSUAT;
        }

        function save() {
            debugger;
            vm.thongtin_Phuongtien.TRANGTHIETBI = angular.copy(vm.equipments);
            $http.post('/api/PhuongTien/Update_ThongTin_PhuongTien', vm.thongtin_Phuongtien)
                .then(response => {
                    debugger;
                });
        }

        function initialize() {
            getMasterData();
            getVehicleMasters().then(result => {
                get_Thongtien_Phuongtien();
            });
            
        }

        function generateTrangThietBiList() {
            var result = [];
            vm.TRANGTHIETBI.forEach(item => {
                let equipment = vm.thongtin_Phuongtien.TRANGTHIETBI ? vm.thongtin_Phuongtien.TRANGTHIETBI.find(t => t.ID_THIETBI == item.id) : null;
                if (equipment) {
                    equipment.NAME = item.name;
                    result.push(equipment);
                } else {
                    result.push({ ID: 0,ID_THIETBI: item.id, NAME: item.name, ID_PHUONGTIEN: vm.phuongtien_Id, ID_YEUCAU: 1, NGAY_CAP: null, NGAY_HET_HAN: null, NGAY_GIAO_THEO_XE: null, TINH_TRANG: true });
                }
            });
            return result;
        }

        function gotoEdit(vehicleId) {
            $state.go('editVehicle', { id: vehicleId });
        }

        function getVehicleMasters() {
            return $http.get('/api/Dinhnghia_Phuongtien/GetAll_Dinhnghia_Phuongtien')
                .then(response => {
                    vm.all_VehicleMaster = response.data;
                });
        }
    }

})();