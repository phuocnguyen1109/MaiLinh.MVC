(function () {
    'use strict'
    var app = angular.module('mainApp', ['ui.router', 'ui.bootstrap']);

    app.controller('mainController', mainController);

    function mainController($scope, $state, $stateParams) {
        var vm = this;

        vm.employees = [
            { id: '0001', picture: 'anh.jpg', firstName: 'Nguyễn Hữu', lastName: 'Phước', doB: '11/09/1992', phone: '01644202279', dateIn: '01/06/2018', role: 'IT', typeContract: 'Có Thời Hạn', duration: '1 Năm', expired: '01/07/2019' },
            { id: '0002', picture: 'no_avatar.png', firstName: 'Nguyễn Văn', lastName: 'Hoàng', doB: '01/07/1998', phone: '0344112244', dateIn: '01/07/2018', role: 'Kinh Doanh', typeContract: 'Có Thời Hạn', duration: '1 Năm', expired: '01/07/2019' },
            { id: '0003', picture: 'no_avatar.png', firstName: 'Lê Hoàng Thanh', lastName: 'Trúc', doB: '11/10/1994', phone: '0120778458', dateIn: '01/06/2018', role: 'Thư Ký', typeContract: 'Vô Thời Hạn', duration: '', expired: '' },
        ];

        vm.gotoEmployees = gotoEmployees;
        vm.gotoVehicleManagement = gotoVehicleManagement;
        vm.gotoMasterDataManagement = gotoMasterDataManagement;
        vm.gotoAccountManagement = gotoAccountManagement;
        vm.gotoNationalManagement = gotoNationalManagement;


        function gotoEmployees() {
            $state.go('employees');
        }

        function gotoVehicleManagement() {
            $state.go('vehicle');
        }

        function gotoMasterDataManagement() {
            $state.go('masterData');
        }

        function gotoAccountManagement() {
            $state.go('account');
        }

        function gotoNationalManagement() {
            $state.go('nationalManagement');
        }
    }
})();