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
        vm.IsViewing = $stateParams.IsViewing;

        function initialize() {
            //var date = new Date();
            //vm.getDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
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
                { typeId: 3, typeName: "Khác" }
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
            if (!vm.userContract) return false;

            vm.isValid = false;
            if (!vm.userContract.ContractTypeId) return vm.isValid;

                //if (!vm.userContract.Duration) {
                //    vm.message = "Nhập thời hạn của hợp đồng!";
                //    return;
                //}
                if (vm.userContract.ContractNumber.toString().trim().length==0 || !vm.userContract.ContractNumber) {
                    vm.message = "Nhập số hợp đồng!";
                    return vm.isValid;
                }
                if (vm.userContract.SignedIn == null) {
                    vm.message = "Nhập ngày ký hợp đồng!";
                    return vm.isValid;
                }
                vm.message = null;
            
            return true;
            }

        $scope.$watch('vm.userContract.SignedIn', function (value) {
            if (!vm.userContract || vm.userContract.Duration == 0 ) return;
            if (!value) {
                vm.userContract.SignOut = null;
                return;
            }

            var date = new Date(value);
            vm.userContract.SignOut = new Date(date.getFullYear(), date.getMonth() + vm.userContract.Duration, date.getDate(), 7, 0, 0);
        });

        function generExpiredDate() {
            if (vm.userContract.Duration == 0) {
                vm.userContract.SignOut = null;
                return;
            }
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
        }

        function saveChanges() {
            if (vm.userContract.Id == 0) {
                $http.post('/api/Person/CreatePersonContract', vm.userContract)
                    .then(function (result) {
                        getContracts();
                    });
            }
            else {
                $http.post('/api/Person/UpdatePersonContract', vm.userContract)
                    .then(function (result) {
                        getContracts();
                    });
            }
        }

        function openDeleteModal(row, $index) {
            vm.deletedDataRow = row;
            vm.deletedDataRow.Index = $index;
        }

        function deleted() {
            $http.post('/api/Person/DeletePersonContract', vm.deletedDataRow)
                .then(function (result) {
                    if (result.data > 0) {
                        alert('Xóa Thông Tin Hợp Đồng Thành Công');
                        vm.userContracts.splice(vm.deletedDataRow.Index, 1);
                    }
                });
        }

    };
})();