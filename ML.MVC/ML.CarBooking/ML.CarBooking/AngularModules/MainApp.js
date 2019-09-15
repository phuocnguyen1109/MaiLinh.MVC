(function () {
    'use strict'
    var app = angular.module('mainApp', ['ui.router', 'ui.bootstrap']);

    app.controller('mainController', mainController);

    function mainController($http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
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
        vm.checkChangePW = checkChangePW;


        function initialize() {

            vm.person = {
                personId: 0, image: '', firstName: 'Nguyễn Hữu', lastName: 'Phước', isMale: true, doB: '11/09/1992', phone: '01644202279', email: '123@gmail.com', placeOfBirth: 'HCM', homeTownId: 1, religionId: 1, nationId: 2, address: { cityId: 1, districtId: 1, address: 'aaaaaa' }
            };
            vm.password = { PWOld: "", PWNew: "", PWConfirm: "" };
            vm.checkPW = false;

            vm.placeOfBirth = [
                { id: 1, name: 'Hồ Chí Minh' },
                { id: 2, name: 'Hà Nội' }
            ];

            vm.religion = [
                { id: 0, name: '-- Chọn Tôn Giáo --' },
                { id: 1, name: 'Không' },
                { id: 2, name: 'Phật Giáo' },
                { id: 3, name: 'Thiên Chúa Giáo' },
                { id: 4, name: 'Hồi Giáo' }
            ];

            vm.countries = [
                { id: 0, name: '-- Chọn Quốc Tịch --' },
                { id: 1, name: 'Việt Nam' },
                { id: 2, name: 'Thái Lan' },
                { id: 3, name: 'Malaysia' }
            ];

            vm.nations = [
                { id: 0, name: '-- Chọn Dân Tộc --' },
                { id: 1, name: 'Kinh' },
                { id: 2, name: 'Ê - ĐÊ' },
                { id: 3, name: 'H` Mông' },
                { id: 4, name: 'Nùng' }
            ];

            getCities();
        }

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

        function getCities() {
            vm.cities = [{ Id: 0, Name: '-- Chọn Thành Phố --' }];
            $http.get('/api/Location/GetAllCity')
                .then(function (result) {
                    if (result) {
                        result.data.forEach(function (item, index) {
                            vm.cities.push({ Id: item.Id, Name: item.Name });
                        });
                    }
                });
        }

        //function getDistricts() {
        //    vm.districts = [{ Id: 0, Name: '-- Chọn Quận / Huyện --' }];
        //    if (vm.personAddresses.address.CityId == 0) {
        //        return;
        //    }
        //    $http.get('/api/Location/GetAllDistrictByCityId', { params: { cityId: vm.personAddresses.address.CityId } })
        //        .then(function (result) {
        //            if (!result) return;
        //            result.data.forEach(function (item, index) {
        //                vm.districts.push({ Id: item.Id, Name: item.Name });
        //            });
        //        });
        //}

        //function getContactDistricts() {
        //    vm.contactDistricts = [{ Id: 0, Name: '-- Chọn Quận / Huyện --' }];
        //    if (vm.personAddresses.contactAddress.CityId == 0) {
        //        return;
        //    }
        //    $http.get('/api/Location/GetAllDistrictByCityId', { params: { cityId: vm.personAddresses.contactAddress.CityId } })
        //        .then(function (result) {
        //            if (!result) return;
        //            result.data.forEach(function (item, index) {
        //                vm.contactDistricts.push({ Id: item.Id, Name: item.Name });
        //            });
        //        });
        //}

        function checkChangePW() {
            if (vm.password.PWOld != vm.password.PWNew) {
                if (vm.password.PWNew == vm.password.PWConfirm) {
                    vm.checkPW = true;
                }
            }
            return vm.checkPW = false;
        }


        console.log(vm)
    }
})();