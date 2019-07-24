(function () {
    'use strict'
    angular.module('mainApp').controller('healthCheckManagementController', healthCheckManagementController);

    function healthCheckManagementController() {
        var vm = this;
        vm.initialize = initialize;
        vm.openAddModal = openAddModal;
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.deleted = deleted;

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

        function openAddModal() {
            vm.userHealthCheck = {
                id: null,
                healthStandards: [],
                yearOfhealthStandar: null,
                note: null };
            vm.modalTitle = "Thêm mới tiêu chuẩn khám";
        }
        function openEditModal(r) {
            //debugger;
            vm.userHealthCheck = r;
            var h = vm.healthStandards;

            
        }
        function openDeleteModal(r) {

        }

        function deleted() {

        }
    }
})();