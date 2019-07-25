(function () {
    'use strict'
    angular.module('mainApp').controller('phoneNumberSubTabController', phoneNumberSubTabController);

    phoneNumberSubTabController.$inject = ['$http', '$rootScope', '$scope', '$state'];

    function phoneNumberSubTabController($http, $rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAddModal = openAddModal
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.saveChanges = saveChanges;
        vm.deleted = deleted;

        vm.isValid = false;

        function initialize() {
            vm.userPhoneNumber = { id: null, typeId: null, typeName: null, phoneNumber: null };
            getPhoneNumbers();
            getTypesOfPhoneNumber();
        };

        function getPhoneNumbers() {
            //TODO: get data by api
            vm.phoneNumbers = [
                { id: 1, typeId: 1, typeName: "Di Động", phoneNumber: "0707xxxxxx7" },
            ];
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
            if (vm.userPhoneNumber.typeId != null) {
                if (vm.userPhoneNumber.phoneNumber == "" || !vm.userPhoneNumber.phoneNumber) {
                    vm.message = "Không để trống các mục!";
                    vm.isValid = false;
                    return;
                }
                vm.message = null;
                vm.isValid = true;
            }
        }

        function openAddModal() {
            vm.modalTitle = "Thêm mới";
            vm.userPhoneNumber = { id: null, typeId: null, typeName: null, phoneNumber: null };
            vm.isValid = false;
        }

        function openEditModal(row) {
            vm.modalTitle = "Chỉnh sửa";
            vm.isValid = true;
            vm.userPhoneNumber = row;
        }

        function saveChanges() {
            var r = vm.userPhoneNumber;
            if (r.id) {
                vm.phoneNumbers.forEach(function (item, index) {
                    if (r.id == item.id) {
                        vm.typesOfPhoneNumber.forEach(function (i, index) {
                            if (r.typeId == i.typeId) {
                                item.typeId = i.typeId;
                                item.typeName = i.typeName;
                                return;
                            }
                        });
                        item.phoneNumber = r.phoneNumber;
                        return;
                    }
                    return;
                });
            } else {
                var newId = new Date();
                newId = newId.getMilliseconds().toString();
                vm.typesOfPhoneNumber.forEach(function (i, index) {
                    if (r.typeId == i.typeId) {
                        vm.userPhoneNumber = {
                            id: newId, typeId: i.typeId, typeName: i.typeName, phoneNumber: r.phoneNumber
                        };

                        vm.phoneNumbers.push(vm.userPhoneNumber);
                        return;
                    }
                });
            };
        }

        function openDeleteModal(row) {
            vm.deletedDataRow = row;
            console.log(vm.deletedDataRow);
        }

        function deleted(row) {
            var deletedIndex = null;
            vm.phoneNumbers.forEach(function (item, index) {
                if (row.id == item.id) {
                    deletedIndex = index;
                    vm.phoneNumbers.splice(deletedIndex, 1);
                    return;
                }
            });
        }

    };
})();