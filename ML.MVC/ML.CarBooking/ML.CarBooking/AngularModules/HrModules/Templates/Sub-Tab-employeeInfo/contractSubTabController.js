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
            //Example
            var date = new Date();
            vm.getDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();

            getContracts();
            getTypesOfContract();
            getContractPeriod();

            vm.userContract = {
                id: null,
                createBy: "admin",
                createDate: vm.getDate,
                typeId: null,
                typeName: null,
                contractNumber: null,
                startDate: null,
                contractPeriodId: null,
                contractPeriod: null,
                expiredDate: null,
            };


        };

        function getContracts() {
            //TODO: get data by api
            //$http.get('/api/Person/GetPersonContracts', { params: { pid: personId } })
            //    .then(function (response) {
            //        debugger;
            //    });
            vm.contracts = [
                {
                    id: 1,
                    createBy: "admin",
                    createDate: vm.getDate,
                    typeId: 1,
                    typeName: "Hợp Đồng Lao Động",
                    contractNumber: "01837634SDF",
                    startDate: "12/01/2019",
                    contractPeriodId: 6,
                    contractPeriod: "6 tháng",
                    expiredDate: "12/07/2019",
                }
            ];
        }

        function getTypesOfContract() {
            //TODO: get data by api
            vm.typesOfContract = [
                { typeId: 1, typeName: "Hợp Đồng Lao Động" },
                { typeId: 2, typeName: "Hợp Đồng Hợp Tác" },
                { typeId: 3, typeName: "Khác" },
            ];
        }

        function getContractPeriod() {
            vm.contractPeriod = [
                { contractPeriodId: 3, contractPeriod: "3 tháng" },
                { contractPeriodId: 6, contractPeriod: "6 tháng" },
                { contractPeriodId: 12, contractPeriod: "12 tháng" },
                { contractPeriodId: 24, contractPeriod: "24 tháng" },
                { contractPeriodId: 36, contractPeriod: "36 tháng" },
                { contractPeriodId: 0, contractPeriod: "Không xác định" },
            ];
        }

        function checkValid() {
            if (vm.userContract.typeId != null) {
                if (vm.userContract.contractPeriodId == null) {
                    vm.message = "Nhập thời hạn của hợp đồng!";
                    vm.isValid = false;
                    return;
                }
                if (vm.userContract.contractNumber == "" || !vm.userContract.contractNumber) {
                    vm.message = "Nhập số hợp đồng!";
                    vm.isValid = false;
                    return;
                }
                if (vm.userContract.startDate == null) {
                    vm.message = "Nhập ngày ký hợp đồng!";
                    vm.isValid = false;
                    return;
                }
                vm.message = null;
                vm.isValid = true;
            }
        }

        function generExpiredDate(row) {
            var expiredDate = null;
            if (vm.userContract.startDate != null && vm.userContract.contractPeriodId != null) {
                var startDate = new Date(vm.userContract.startDate);
                console.log(startDate);
                expiredDate = startDate.setMonth(startDate.getMonth() + vm.userContract.contractPeriodId);
                vm.userContract.expiredDate = new Date(expiredDate);
            }
        }

        function openAddModal() {
            vm.modalTitle = "Thêm mới";
            vm.isValid = false;
            vm.userContract = {
                id: null,
                createBy: "admin",
                createDate: vm.getDate,
                typeId: null,
                typeName: null,
                contractNumber: null,
                startDate: null,
                contractPeriodId: null,
                contractPeriod: null,
                expiredDate: null,
            };
        }

        function openEditModal(row) {
            vm.modalTitle = "Chỉnh sửa";
            vm.isValid = true;
            var sDate = new Date(row.startDate);
            var eDate = new Date(row.expiredDate);
            vm.userContract = row;
            vm.userContract.startDate = sDate;
            vm.userContract.expiredDate = eDate;
        }

        function saveChanges() {
            vm.userContract.startDate = (vm.userContract.startDate.getMonth() + 1) + "/" + vm.userContract.startDate.getDate() + "/" + vm.userContract.startDate.getFullYear();
            vm.userContract.expiredDate = (vm.userContract.expiredDate.getMonth() + 1) + "/" + vm.userContract.expiredDate.getDate() + "/" + vm.userContract.expiredDate.getFullYear();
            var r = vm.userContract;
            if (r.id) {
                vm.contracts.forEach(function (item, index) {
                    if (r.id == item.id) {
                        vm.typesOfContract.forEach(function (i, index) {
                            if (r.typeId == i.typeId) {
                                item.typeId = i.typeId;
                                item.typeName = i.typeName;
                                return;
                            }
                        });
                        vm.contractPeriod.forEach(function (p, index) {
                            if (r.contractPeriodId == p.contractPeriodId) {
                                item.contractPeriodId = p.contractPeriodId;
                                item.contractPeriod = p.contractPeriod;
                                return;
                            }
                        });
                        item.contractNumber = r.contractNumber;
                        return;
                    }
                    return;
                });
            } else {
                var newId = new Date();
                newId = newId.getMilliseconds().toString();
                vm.typesOfContract.forEach(function (i, index) {
                    if (r.typeId == i.typeId) {
                        vm.contractPeriod.forEach(function (p, index) {
                            if (r.contractPeriodId == p.contractPeriodId) {
                                r.contractPeriod = p.contractPeriod;
                                return;
                            }
                        });
                        r.id = newId;
                        r.typeName = i.typeName;
                        vm.userContract = r;

                        vm.contracts.push(vm.userContract);
                        console.log(vm.contracts);
                        return;
                    };
                });
        };
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
}) ();