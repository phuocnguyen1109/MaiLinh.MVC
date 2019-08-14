(function () {
    'use strict'
    angular.module('mainApp')
        .controller('editEmployeeController', editEmployeeController);

    editEmployeeController.$inject = ['$http', '$scope', '$state', '$stateParams'];
    function editEmployeeController($http, $scope, $state, $stateParams) {
        var vm = this;
        var personId = $stateParams.id;

        vm.personAddresses = [];

        vm.saveChanges = saveChanges;
        vm.cancel = cancel;
        vm.getDistricts = getDistricts;
        vm.getContactDistricts = getContactDistricts;


        vm.initialize = initialize;

        function initialize() {
            getMasterData();
            getCities();
            getPerson();
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


        function getDistricts() {
            vm.districts = [{ Id: 0, Name: '-- Chọn Quận / Huyện --' }];
            if (vm.personAddresses.address.CityId == 0) {
                return;
            }
            $http.get('/api/Location/GetAllDistrictByCityId', { params: { cityId: vm.personAddresses.address.CityId } })
                .then(function (result) {
                    if (!result) return;
                    result.data.forEach(function (item, index) {
                        vm.districts.push({ Id: item.Id, Name: item.Name });
                    });
                });
        }

        function getContactDistricts() {
            vm.contactDistricts = [{ Id: 0, Name: '-- Chọn Quận / Huyện --' }];
            if (vm.personAddresses.contactAddress.CityId == 0) {
                return;
            }
            $http.get('/api/Location/GetAllDistrictByCityId', { params: { cityId: vm.personAddresses.contactAddress.CityId } })
                .then(function (result) {
                    if (!result) return;
                    result.data.forEach(function (item, index) {
                        vm.contactDistricts.push({ Id: item.Id, Name: item.Name });
                    });
                });
        }

        function cancel() {
            angular.element(document).find('.modal-backdrop').remove();
            $state.go('employees');
        }

        function saveChanges() {
            debugger;
            vm.person.addresses = [vm.personAddresses.address, vm.personAddresses.contactAddress];
            vm.person.IsPension = vm.person.IsPension == 'true' ? true : false;
            vm.person.IsMale = vm.person.IsMale == 'true' ? true : false;
            vm.person.Actived = vm.person.Actived ? 'true' : 'false';
            vm.person.DoB = vm.person.DoB.getFullYear() == 1 ? null : vm.person.DoB;
            vm.person.MLCDate = vm.person.MLCDate.getFullYear() == 1 ? null : vm.person.MLCDate;
            vm.person.StartDate = vm.person.StartDate.getFullYear() == 1 ? null : vm.person.StartDate;

            $http.post('/api/Person/UpdatePersonInformation', vm.person)
                .then(function (result) {
                    alert('Lưu Thông Tin Thành Công');
                });
        }

        function getPerson() {
            $http.get('/api/Person/GetPersonInformation', { params: { id: personId } })
                .then(function (result) {
                    if (result.data) {
                        vm.person = result.data;
                        vm.person.IsPension = vm.person.IsPension ? 'true' : 'false';
                        vm.person.IsMale = vm.person.IsMale ? 'true' : 'false';
                        vm.person.Actived = vm.person.Actived ? 'true' : 'false';
                        vm.person.DoB = new Date(vm.person.DoB);
                        vm.person.MLCDate = new Date(vm.person.MLCDate);
                        vm.person.StartDate = new Date(vm.person.StartDate);
                        vm.personAddresses.address = angular.copy(vm.person.Addresses).find(x => x.Type == 1);
                        if (!vm.personAddresses.address) {
                            vm.personAddresses.address = { Id: 0, PersonId: personId, Address: null, CityId: 0, DistrictId: 0, Type: 1 };
                        } else {
                            getDistricts();
                        }
                        vm.personAddresses.contactAddress = angular.copy(vm.person.Addresses).find(x => x.Type == 2);
                        if (!vm.personAddresses.contactAddress) {
                            vm.personAddresses.contactAddress = { Id: 0, PersonId: personId, Address: null, CityId: 0, DistrictId: 0, Type: 2 };
                        } else {
                            getContactDistricts();
                        }
                        
                        
                    }
                });
        }

        function getMasterData() {
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

            vm.departments = [
                { id: 0, name: '-- Chọn Bộ Phận --' },
                { id: 1, name: 'Nhân Sự' },
                { id: 2, name: 'Kế Toán' },
                { id: 3, name: 'Kỹ Thuật - An Toàn' },
                { id: 4, name: 'Điều Hành' }
            ];

            vm.roles = [
                { id: 0, name: '-- Chọn Chức Vụ --' },
                { id: 2, name: 'Trưởng Phòng' },
                { id: 1, name: 'Phó Phòng' },
                { id: 3, name: 'Thư Ký' },
                { id: 4, name: 'Nhân Viên' }
            ];



        


        }


    }
})();