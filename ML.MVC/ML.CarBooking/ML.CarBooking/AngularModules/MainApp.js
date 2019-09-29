(function () {
    'use strict'
    var app = angular.module('mainApp', ['ui.router', 'ui.bootstrap','PubSub']);

    app.controller('mainController', mainController);

    function mainController($scope, $state, $stateParams) {
        var vm = this;

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