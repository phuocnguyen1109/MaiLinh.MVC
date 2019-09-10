(function () {
    'use strict'
    angular.module('mainApp').controller('healthCheckManagementController', healthCheckManagementController);

    healthCheckManagementController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams'];
    function healthCheckManagementController($rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.openAddModal = openAddModal;
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.deleted = deleted;
        vm.IsViewing = $stateParams.params.IsViewing;
        vm.saveChanges = saveChanges;
        vm.Checked = Checked;
        vm.checkValid = checkValid;

        vm.isValid = false;

        function initialize() {

            getHealthChecks();
            getHealthStandards();
        }

        function getHealthChecks() {
            //TODO: get data by api
            vm.healthChecks = [
                {
                    id: 1,
                    healthStandards: [
                        { isCheck: true, healthStandardId: 1, healthStandardName: "Thông tư 14" },
                        { isCheck: true, healthStandardId: 2, healthStandardName: "Thông tư 24" },
                    ],
                    yearOfhealthStandar: "2016",
                    note: "Bình thường"
                },
                {
                    id: 2,
                    healthStandards: [
                        { isCheck: true, healthStandardId: 3, healthStandardName: "Đặc thù theo khách hàng" },
                    ],
                    yearOfhealthStandar: "2017",
                    note: "Khám Tổng Quát (Mắt Cận : T0,5/P1)"
                },
            ];
            console.log("healthChecks => " + vm.healthChecks);
        }

        function getHealthStandards() {
            vm.healthStandards = [
                { isCheck: false, healthStandardId: 1, healthStandardName: "Thông tư 14" },
                { isCheck: false, healthStandardId: 2, healthStandardName: "Thông tư 24" },
                { isCheck: false, healthStandardId: 3, healthStandardName: "Đặc thù theo khách hàng" },
                { isCheck: false, healthStandardId: 4, healthStandardName: "Khác" },
            ];
        }
        function resetModel() {
            vm.userHealthCheck = {
                id: null,
                healthStandards: [],
                yearOfhealthStandar: null,
                note: null
            };
        }

        function openAddModal() {
            vm.modalTitle = "Thêm mới tiêu chuẩn khám";
            vm.isValid = false;
            resetModel();
        }

        function openEditModal(r) {
            //debugger;
            vm.userHealthCheck = r;
            console.log(vm.userHealthCheck);
            var h = vm.healthStandards;

            
        }

        function Checked(row) {
            console.log(row);
            if (row.isCheck) {
                var found = false;
                vm.userHealthCheck.healthStandards.forEach(function (item, index) {
                    if (row.healthStandardId == item.healthStandardId) {
                        found = true;
                        return;
                    };
                });
                if (!found) {
                    vm.userHealthCheck.healthStandards.push(row);
                    console.log(vm.userHealthCheck.healthStandards);
                }

            }
        }
        function checkValid() {
            if (vm.userHealthCheck.healthStandards.length > 0) {
                if (vm.userHealthCheck.yearOfhealthStandar != "" || vm.userHealthCheck.yearOfhealthStandar != null) {
                    vm.message = null;
                    vm.isValid = true; 
                    return;
                }
                vm.message = "Không để trống các mục!";
                vm.isValid = false;
            }
        }

        function saveChanges() {
            vm.healthChecks.push(vm.userHealthCheck);
            resetModel();
        }

        function openDeleteModal(r) {

        }

        function deleted() {

        }
    }
})();