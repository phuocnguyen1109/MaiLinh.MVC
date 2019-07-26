(function () {
    'use strict'
    angular.module('mainApp').controller('employeeInfoController', employeeInfoController);

    employeeInfoController.$inject = ['$http', '$rootScope', '$scope', '$state'];
    function employeeInfoController($http, $rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAddModal = openAddModal;
        vm.openEditModal = openEditModal;
        vm.saveChanges = saveChanges;
        vm.openDeleteModal = openDeleteModal;
        vm.deletedIdentificationCard = deletedIdentificationCard;


        vm.isValid = false;

        function initialize() {
            vm.userIdentificationCard = {
                id: null, idNumber: null, typeId: null, type: null, issuanceDate: null, issuedBy: null
            };
            getIdentificationCards();
            getTypesOfIdentificationCard();
        }

        function getIdentificationCards() {
            vm.identificationCards = [
                { id: 1, idNumber: "0255xxxxx", typeId: 1, typeName: "Chứng minh nhân dân", issuanceDate: "12/12/2011", issuedBy: "TPHCM" },
            ];
        }

        function getTypesOfIdentificationCard() {
            vm.typesOfIdentificationCard = [
                { typeId: 1, typeName: "Chứng minh nhân dân" },
                { typeId: 2, typeName: "Passport" },
                { typeId: 3, typeName: "Thẻ căn cước" },
            ];
        }

        function checkValid() {
            //debugger;
            if (vm.userIdentificationCard.typeId != null) {
                if (vm.userIdentificationCard.idNumber == "" || !vm.userIdentificationCard.idNumber) {
                    vm.message = "Không để trống mục này!";
                    vm.isValid = false;
                    return;
                }
                if (vm.userIdentificationCard.issuanceDate == null || vm.userIdentificationCard.issuedBy == "" || !vm.userIdentificationCard.issuedBy) {
                    vm.message = "Không để trống mục này!";
                    vm.isValid = false;
                    return;
                }
                vm.message = null;
                vm.isValid = true;
            };
        }

        function openAddModal() {
            vm.userIdentificationCard = {
                id: null, idNumber: null, typeId: null, type: null, issuanceDate: null, issuedBy: null
            };
            vm.modalTitle = "Thêm mới giấy tờ tùy thân";
            vm.isValid = false;

        }

        function openEditModal(row) {
            vm.modalTitle = "Chỉnh sửa giấy tờ tùy thân";
            vm.userIdentificationCard = row;
            console.log(row);
            var iDate = new Date(row.issuanceDate);
            vm.userIdentificationCard.issuanceDate = iDate;
            vm.isValid = true;
        }

        function saveChanges() {
            var r = vm.userIdentificationCard;
            var iDate = (r.issuanceDate.getMonth() + 1) + "/" + r.issuanceDate.getDate() + "/" + r.issuanceDate.getFullYear();
            if (r.id) {
                vm.identificationCards.forEach(function (item, index) {
                    if (r.id == item.id) {
                        item.idNumber = r.idNumber;
                        vm.typesOfIdentificationCard.forEach(function (i, inndex) {
                            if (i.typeId == r.typeId) {
                                item.typeId = i.typeId;
                                item.typeName = i.typeName;
                            }
                        });
                        item.issuanceDate = iDate;
                        item.issuedBy = r.issuedBy;
                    }
                    return;
                });
            } else {
                vm.message = null;
                var isExist = false;
                vm.identificationCards.forEach(function (item, index) {
                    if (r.typeId == item.typeId) {
                        alert(item.typeName + " đã được cung cấp!");
                        isExist = true;
                        return;
                    }
                })
                if (!isExist) {
                    vm.typesOfIdentificationCard.forEach(function (i, inndex) {
                        if (i.typeId == r.typeId) {
                            vm.userIdentificationCard = {
                                id: i.typeId, idNumber: r.idNumber, typeId: i.typeName, typeName: i.typeName, issuanceDate: iDate, issuedBy: r.issuedBy
                            };

                            vm.identificationCards.push(vm.userIdentificationCard);
                            return;
                        }
                    });
                    return;
                }
            };
        }

        function openDeleteModal(row) {
            vm.selectedRow = row;
        }

        function deletedIdentificationCard(r) {
            //debugger;
            var deletedIndex = null;
            vm.identificationCards.forEach(function (item, index) {
                if (item.id == r.id) {
                    deletedIndex = index;
                }
            });
            vm.identificationCards.splice(deletedIndex, 1);
        }

    };
})();