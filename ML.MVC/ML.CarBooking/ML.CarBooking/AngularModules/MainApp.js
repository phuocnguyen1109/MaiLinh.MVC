(function () {
    'use strict'
    var app = angular.module('mainApp', ['ui.router', 'ui.bootstrap', 'ngFileUpload']);

    app.controller('mainController', mainController);

    function mainController($scope, $state, $stateParams) {
        var vm = this;

        vm.employees = [
            { id: '0001', picture: 'anh.jpg', firstName: 'Nguyễn Hữu', lastName: 'Phước', doB: '11/09/1992', phone: '01644202279', dateIn: '01/06/2018', role: 'IT', typeContract: 'Có Thời Hạn', duration: '1 Năm', expired: '01/07/2019' },
            { id: '0002', picture: 'no_avatar.png', firstName: 'Nguyễn Văn', lastName: 'Hoàng', doB: '01/07/1998', phone: '0344112244', dateIn: '01/07/2018', role: 'Kinh Doanh', typeContract: 'Có Thời Hạn', duration: '1 Năm', expired: '01/07/2019' },
            { id: '0003', picture: 'no_avatar.png', firstName: 'Lê Hoàng Thanh', lastName: 'Trúc', doB: '11/10/1994', phone: '0120778458', dateIn: '01/06/2018', role: 'Thư Ký', typeContract: 'Vô Thời Hạn', duration: '', expired: '' },
        ];
        vm.isMainPage = true;
        vm.active = 0;
        vm.slides = [
            { id: 1, imgUrl: 'car.png' },
            { id: 2, imgUrl: '16seats.jpg' },
            { id: 3, imgUrl: '29seats.png' }
        ];

        vm.gotoEmployees = gotoEmployees;
        vm.gotoVehicleManagement = gotoVehicleManagement;
        vm.gotoMasterDataManagement = gotoMasterDataManagement;
        vm.gotoAccountManagement = gotoAccountManagement;
        vm.gotoNationalManagement = gotoNationalManagement;
        vm.goMainPage = goMainPage;


        function gotoEmployees() {
            $state.go('employees');
            vm.isMainPage = false;
        }

        function gotoVehicleManagement() {
            $state.go('vehicle');
            vm.isMainPage = false;
        }

        function gotoMasterDataManagement() {
            $state.go('masterData');
            vm.isMainPage = false;
        }

        function gotoAccountManagement() {
            $state.go('account');
            vm.isMainPage = false;
        }

        function gotoNationalManagement() {
            $state.go('nationalManagement');
            vm.isMainPage = false;
        }

        function goMainPage() {
            $state.go('dashboard');
            vm.isMainPage = true;
        }
    }
})();