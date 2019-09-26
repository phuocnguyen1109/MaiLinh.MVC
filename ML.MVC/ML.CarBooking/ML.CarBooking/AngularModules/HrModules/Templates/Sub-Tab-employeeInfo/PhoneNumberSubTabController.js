(function () {
    'use strict'
    angular.module('mainApp').controller('phoneNumberSubTabController', phoneNumberSubTabController);

    phoneNumberSubTabController.$inject = ['$http', '$state', '$stateParams'];

    function phoneNumberSubTabController($http, $state, $stateParams) {
        var vm = this;

        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAddModal = openAddModal
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.saveChanges = saveChanges;
        vm.deleted = deleted;

        vm.isValid = false;
        var userId = $state.params.id;
        vm.IsViewing = $stateParams.IsViewing;

        vm.personPhoneModel = {};

        function initialize() {
            resetModel();
            getPhoneNumbers();
            getTypesOfPhoneNumber();

            //Example
            var date = new Date();
            vm.getDate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

        };

        function getPhoneNumbers() {
            if (!userId) {
                return;
            }
            $http.get('/api/Person/GetPersonPhones', { params: { pid: userId } })
                .then(function (result) {
                    vm.phoneNumbers = result.data;
                    vm.phoneNumbers.forEach(function (item, index) {
                        switch (item.PhoneType) {
                            case 1: item.TypeDisplay = 'Điện Thoại Di Động'; break;
                            case 2: item.TypeDisplay = 'Điện Thoại Bàn'; break;
                            case 3: item.TypeDisplay = 'Số Fax'; break;
                        }
                    });

                });
        }

        function getTypesOfPhoneNumber() {
            //TODO: get data by api
            vm.typesOfPhoneNumber = [

                { typeId: 1, typeName: "Điện Thoại Di Động" },
                { typeId: 2, typeName: "Điện Thoại Bàn" },
                { typeId: 3, typeName: "Fax" },
            ];
        }

        function checkValid() {
            if (vm.personPhoneModel.phoneType != null) {
                if (vm.personPhoneModel.phoneNumber.length == 0 && !vm.personPhoneModel.phoneNumber) {
                    vm.message = "Không để trống các mục!";
                    vm.isValid = false;
                    return;
                }
                vm.message = null;
                vm.isValid = true;
                return;
            }
            vm.isValid = false;
        }

        function resetModel() {
            vm.personPhoneModel = {
                id: 0,
                phoneNumber: '',
                phoneType: 0,
                personId: userId
            };
        }

        function openAddModal() {
            vm.modalTitle = "Thêm mới";
            resetModel();
            vm.isValid = false;
        }

        function openEditModal(row) {
            resetModel();
            vm.modalTitle = "Chỉnh sửa";
            vm.personPhoneModel.id = row.Id;
            vm.personPhoneModel.phoneType = row.PhoneType;
            vm.personPhoneModel.phoneNumber = row.PhoneNumber;
            vm.isValid = true;

        }

        function saveChanges() {
            if (!vm.isValid) {
                return;
            }

            if (vm.personPhoneModel.id == 0) {
                $http.post('/api/Person/AddPersonPhone', vm.personPhoneModel)
                    .then(function (result) {
                        getPhoneNumbers();
                    });
            } else {
                $http.post('/api/Person/UpdatePersonPhone', vm.personPhoneModel)
                    .then(function (result) {
                        getPhoneNumbers();
                    });
            }
        }

        function openDeleteModal(row) {
            vm.deletedDataRow = row;

        }

        function deleted(row) {
            vm.personPhoneModel.id = row.Id;
            vm.personPhoneModel.phoneType = row.PhoneType;
            vm.personPhoneModel.phoneNumber = row.PhoneNumber;
            $http.post('/api/Person/DeletePersonPhone', vm.personPhoneModel)
                .then(function (result) {
                    getPhoneNumbers();
                });
        }

    }
})();