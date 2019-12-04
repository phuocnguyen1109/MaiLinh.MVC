(function () {
    'use strict'
    var app = angular.module('mainApp', ['ui.router', 'ui.bootstrap', 'PubSub', 'ngFileUpload']);

    app.controller('mainController', mainController);

    function mainController($scope, $state, $stateParams) {
        var vm = this;

        vm.userClaims = UserClaims;
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

        //Vehicles
        vm.gotoVehicleMaster = gotoVehicleMaster;
        
        vm.goMainPage = goMainPage;

        function getRoleNames() {
            if (vm.userClaims.UserId == -1) return;
            let departmentName = E.Departments.find(x => x.id == vm.userClaims.DepartmentId).name || '';
            let roleName = E.Roles.find(x => x.id == vm.userClaims.RoleId).name || '';
            let rName = departmentName + ' - ' + roleName;
            vm.userClaims.RoleName = rName;
            console.log(vm.userClaims);
        }
        getRoleNames();

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

        // Vehicles

        function gotoVehicleMaster() {
            $state.go('vehicleMaster');
        }
    }
})();