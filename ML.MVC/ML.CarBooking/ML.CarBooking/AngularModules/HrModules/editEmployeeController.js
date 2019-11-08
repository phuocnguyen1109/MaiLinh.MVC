(function () {
    'use strict'
    angular.module('mainApp')
        .controller('editEmployeeController', editEmployeeController);

    editEmployeeController.$inject = ['$q', '$http', '$scope', '$state', '$stateParams', 'PubSub', 'Upload'];

    function editEmployeeController($q, $http, $scope, $state, $stateParams, PubSub, Upload) {
        angular.element(document).find('.modal-backdrop').remove();
        var vm = this;
        var personId = $stateParams.id;
        vm.IsViewing = $stateParams.IsViewing;
        vm.personAddresses = [];
        vm.person = {};
        var tempDistricts = { addressDistrictId: 0, contactDistrictId: 0 };

        vm.saveChanges = saveChanges;
        vm.cancel = cancel;
        vm.getFile = getFile;
        vm.initialize = initialize;
        vm.onChangeAddressCity = onChangeAddressCity;
        vm.onChangeAddressContactCity = onChangeAddressContactCity;

        var changeEducation = null;
        var changeMariageStatus = null;

        function initialize() {
            getMasterData();
            $q.all([getCities(), getDistricts()])
                .then(function (result) {
                    getPerson();
                });
            PubSub.subscribe('PERSON_EDU_CHANGED', changeEducation);
            PubSub.subscribe('PERSON_MARIAGESTATUS', changeMariageStatus);
        }

        changeEducation = function (data) {
            vm.person.GradeId = data.GradeId;
            vm.person.Major = data.Major;
            vm.person.DriveLicenseId = data.selectedDriveLicense;
            vm.person.DriveLicenseExpired = data.DriveLicenseExpired;
            vm.person.DriveLicensePlace = data.DriveLicensePlace;
        }

        changeMariageStatus = function (data) {
            vm.person.MariageStatus = data;
        }

        function getCities() {
            vm.cities = [{ Id: 0, Name: '-- Chọn Thành Phố --' }];
            return $http.get('/api/Location/GetAllCity')
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
            return $http.get('/api/Location/GetAllDistrictByCityId', { params: { cityId: 0 } })
                .then(function (result) {
                    if (!result) return;
                   vm.districts = result.data;
                });
        }

        function onChangeAddressCity() {
            if (!vm.personAddresses) return;
            vm.addressDistricts = angular.copy(vm.districts).filter(x => x.ParentId == vm.personAddresses.address.CityId);
            vm.addressDistricts.splice(0, 0, { Id: 0, Name: '-- Chọn Quận / Huyện --' });
            var isIncludeCurrentDistrict = vm.addressDistricts.some(x => x.Id == tempDistricts.addressDistrictId);
            if (!isIncludeCurrentDistrict) {
                vm.personAddresses.address.DistrictId = 0;
                return;
            }
            vm.personAddresses.address.DistrictId = tempDistricts.addressDistrictId;
        } 

        function onChangeAddressContactCity() {
            if (!vm.personAddresses) return;
            vm.addressContactDistricts = angular.copy(vm.districts).filter(x => x.ParentId == vm.personAddresses.contactAddress.CityId);
            vm.addressContactDistricts.splice(0, 0, { Id: 0, Name: '-- Chọn Quận / Huyện --' });
            var isIncludeCurrentDistrict = vm.addressContactDistricts.some(x => x.Id == tempDistricts.contactDistrictId);
            if (!isIncludeCurrentDistrict) {
                vm.personAddresses.contactAddress.DistrictId = 0;
                return;
            }
            vm.personAddresses.contactAddress.DistrictId = tempDistricts.contactDistrictId;
        } 

        function cancel() {
            angular.element(document).find('.modal-backdrop').remove();
            $state.go('employees');
        }


        function saveChanges() {
            console.log(vm.person);
            vm.person.Addresses = [vm.personAddresses.address, vm.personAddresses.contactAddress];
            vm.person.IsPension = vm.person.IsPension == 'true' ? true : false;
            vm.person.IsMale = vm.person.IsMale == 'true' ? true : false;
            vm.person.Actived = vm.person.Actived ? 'true' : 'false';
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
                        vm.person.FullName = vm.person.FirstName + " " + vm.person.LastName;
                        vm.person.IsPension = vm.person.IsPension ? 'true' : 'false';
                        vm.person.IsMale = vm.person.IsMale ? 'true' : 'false';
                        vm.person.Actived = vm.person.Actived ? 'true' : 'false';
                        vm.person.DepartmentName = vm.departments.find(x => x.id == vm.person.DepartmentId).name;
                        vm.person.RoleName = vm.roles.find(x => x.id == vm.person.RoleId).name;
                        vm.person.imageUrl = vm.person.imageUrl == null ? vm.person.IsMale == 'true' ? "../../../Content/Images/male.png" : "../../../Content/Images/female.png" : vm.person.imageUrl;
                        vm.personAddresses.address = angular.copy(vm.person.Addresses).find(x => x.Type == 1);
                        if (!vm.personAddresses.address) {
                            vm.personAddresses.address = { Id: 0, PersonId: personId, Address: null, CityId: 0, DistrictId: 0, Type: 1 };
                        } else {
                            tempDistricts.addressDistrictId = vm.personAddresses.address.DistrictId;
                            onChangeAddressCity();
                        }
                        vm.personAddresses.contactAddress = angular.copy(vm.person.Addresses).find(x => x.Type == 2);
                        if (!vm.personAddresses.contactAddress) {
                            vm.personAddresses.contactAddress = { Id: 0, PersonId: personId, Address: null, CityId: 0, DistrictId: 0, Type: 2 };
                        }
                        else {
                            tempDistricts.contactDistrictId = vm.personAddresses.contactAddress.DistrictId;
                            onChangeAddressContactCity();
                        }
                    }
                    PubSub.publish('PERSON_LOAD', vm.person);
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

            vm.departments = E.Departments;

            vm.roles = E.Roles;
        }

        function getFile(file) {
            alert('XIN THÔNG CẢM ! Chức năng này đang được thực hiện và chưa thể hoạt động.');
            //console.log(file);
            //var myReader = new FileReader();
            //myReader.onloadend = () => {
            //    console.log(myReader.result);
            //    //TO-DO: api here
            //    //$http.put('/api/Person/UploadPersonImage', myReader.result )
            //    //    .then(function (result) {
            //    //        if (result) {
            //    //            alert("Cập nhật ảnh thành công");

            //                vm.person.imageUrl = myReader.result;
            //    //        }
            //    //})
            //};

            //myReader.readAsDataURL(file);

        };
    }
})();