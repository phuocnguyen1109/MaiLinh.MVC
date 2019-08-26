(function () {
    'use strict'
    angular.module('mainApp').controller('contractSubTabController', contractSubTabController);

    contractSubTabController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams'];

    function contractSubTabController($http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAddModal = openAddModal
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.saveChanges = saveChanges;
        vm.deleted = deleted;
        vm.generExpiredDate = generExpiredDate;

        vm.isValid = false;
        var personId = $stateParams.id;

        function initialize() {
            getContracts();
            getTypesOfContract();
            getContractPeriod();
           



        };

        function resetModel() {
            vm.userContract = {
                Id: 0,
                CreateBy: "admin",
                CreateOn: null,
                ContractTypeId: 0,
                ContractNumber: 0,
                Duration: 0,
                SignedIn: null,
                SignOut: null,
                PersonId: personId
            };
        }

        function getContracts() {
            $http.get('/api/Person/GetPersonContracts', { params: { pid: personId } })
                .then(function (response) {
                    vm.userContracts = [];
                    if (!response) return;
                    response.data.forEach(function (item, index) {
                        item.SignedInDisplay = new Date(item.SignedIn);
                        item.SignedOutDisplay = new Date(item.SignOut);
                        item.DurationDisplay = angular.copy(vm.contractPeriods).find(x => x.contractPeriodId == item.Duration).contractPeriod;
                        item.ContractTypeDisplay = angular.copy(vm.typesOfContracts).find(x => x.typeId == item.ContractTypeId).typeName;
                        vm.userContracts.push(item);
                    });
                });
        }

        function getTypesOfContract() {
            //TODO: get data by api
            vm.typesOfContracts = [
                { typeId: 0, typeName: "--Chọn Loại Hợp Đồng--" },
                { typeId: 1, typeName: "Hợp Đồng Lao Động" },
                { typeId: 2, typeName: "Hợp Đồng Hợp Tác" },
                { typeId: 3, typeName: "Khác" },
            ];
        }

        function getContractPeriod() {
            vm.contractPeriods = [
                { contractPeriodId: 3, contractPeriod: "3 tháng" },
                { contractPeriodId: 6, contractPeriod: "6 tháng" },
                { contractPeriodId: 12, contractPeriod: "12 tháng" },
                { contractPeriodId: 24, contractPeriod: "24 tháng" },
                { contractPeriodId: 36, contractPeriod: "36 tháng" },
                { contractPeriodId: 0, contractPeriod: "Không xác định" },
            ];
        }

        function checkValid() {
            if (vm.userContract.ContractTypeId != null) {
                if (vm.userContract.Duration == null) {
                    vm.message = "Nhập thời hạn của hợp đồng!";
                    vm.isValid = false;
                    return;
                }
                if (vm.userContract.ContractNumber == 0 || !vm.userContract.ContractNumber) {
                    vm.message = "Nhập số hợp đồng!";
                    vm.isValid = false;
                    return;
                }
                if (vm.userContract.SignedIn == null) {
                    vm.message = "Nhập ngày ký hợp đồng!";
                    vm.isValid = false;
                    return;
                }
                vm.message = null;
                vm.isValid = true;
            }
        }

        function generExpiredDate(row) {
            var signedOutDate = null;
            if (vm.userContract.SignedIn != null && vm.userContract.Duration != null) {
                var signedInDate = new Date(vm.userContract.SignedIn);
                signedOutDate = signedInDate.setMonth(signedInDate.getMonth() + vm.userContract.Duration);
                vm.userContract.SignOut = new Date(signedOutDate);
            }
        }

        function openAddModal() {
            vm.modalTitle = "Thêm mới";
            vm.isValid = false;
            resetModel();
        }

        function openEditModal(row) {
            vm.modalTitle = "Chỉnh sửa";
            vm.isValid = true;
            vm.userContract = row;
            vm.userContract.SignedIn = new Date(vm.userContract.SignedIn);
            vm.userContract.SignOut = new Date(vm.userContract.SignOut);
        }

        function saveChanges() {
            debugger;
            if (vm.userContract.Id == 0) {
                $http.post('/api/Person/CreatePersonContract', vm.userContract)
                    .then(function (result) {
                        debugger;
                    });
            }
            else {
                $http.post('/api/Person/UpdatePersonContract', vm.userContract)
                    .then(function (result) {
                        debugger;
                    });
            }
        }

        function openDeleteModal(row) {
            vm.deletedDataRow = row;
        }

        function deleted(row) {
            var deletedIndex = null;
            vm.contracts.forEach(function (item, index) {
                if (row.id == item.id) {
                    deletedIndex = index;
                    vm.contracts.splice(deletedIndex, 1);
                    return;
                }
            });
        }

    };
})();