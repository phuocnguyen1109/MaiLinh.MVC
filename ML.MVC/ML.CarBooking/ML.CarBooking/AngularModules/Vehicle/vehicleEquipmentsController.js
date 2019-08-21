(function () {
    'use strict'
    angular.module('mainApp').controller('vehicleEquipmentsController', vehicleEquipmentsController);

    function vehicleEquipmentsController($rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;

        function initialize() {
            getVehicleEquipments();
            getRequestBys();

        }

        function getVehicleEquipments() {
            //TODO: get data by api
            vm.vehicleEquipments = [
                { id: 1, vehicleName: 'TÚI Y TẾ', recievedDate: Date, expDate:Date, deliveryDateByCar:Date, status: '', requestById: '' },
                { id: 2, vehicleName: 'DANH SÁCH THUỐC/DỤNG CỤ Y TẾ', recievedDate:Date, expDate:Date, deliveryDateByCar:Date, status: '', rerequestByIdquestOfId: '' },
                { id: 3, vehicleName: 'ÁO PHẢN QUANG', recievedDate:Date, expDate:Date, deliveryDateByCar:Date, status: '', requestById: '' },
                { id: 4, vehicleName: 'TAM GIÁC CẢNH BÁO', recievedDate:Date, expDate:Date, deliveryDateByCar:Date, status: '', requestById: '' },
                { id: 5, vehicleName: 'BÚA THOÁT HIỂM', recievedDate:Date, expDate:Date, deliveryDateByCar:Date, status: '', requestById: '' },
                { id: 6, vehicleName: 'ĐÈN PIN CHIẾU SÁNG', recievedDate:Date, expDate:Date, deliveryDateByCar:Date, status: '', requestById: '' },
                { id: 7, vehicleName: 'LƯỚI TRÙM', recievedDate:Date, expDate:Date, deliveryDateByCar:Date, status: '', requestById: '' },
                { id: 8, vehicleName: 'BÌNH CHỮA CHÁY', recievedDate:Date, expDate:Date, deliveryDateByCar:Date, status: '', requestById: '' }
            ]
        }

        function getRequestBys() {
            vm.requestBys = [
                { requestById: 1, requestByName: 'NN' },
                { requestById: 2, requestByName: 'KH' },
                { requestById: 3, requestByName: 'CTY' }
            ]
         

        }
    }

})();