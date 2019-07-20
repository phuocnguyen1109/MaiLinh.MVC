(function () {
    'use strict'
    angular.module('mainApp').controller('healthCheckManagementController', healthCheckManagementController);

    function healthCheckManagementController() {
        var vm = this;
        vm.initialize = initialize;
        vm.openAddModal = openAddModal;

        function initialize() {
            getHealthChecks();
            getHealthStandards();
        }

        function getHealthChecks() {
            //TODO: get data by api
            vm.healthChecks = [
                { id: 1, healthStandardId: 1, healthStandardName: "Thông tư 14", yearOfhealthStandar: "2016", note: "Bình thường" },
                { id: 2, healthStandardId: 2, healthStandardName: "Thông tư 24", yearOfhealthStandar: "2016", note: "Bình thường" },
                { id: 3, healthStandardId: 3, healthStandardName: "Đặc thù theo khách hàng", yearOfhealthStandar: "2017", note: "Khám Tổng Quát (Mắt Cận : T0,5/P1)" },
            ];
            console.log("healthChecks => " + vm.healthChecks);
        }

        function getHealthStandards() {
            vm.healthStandards = [
                { healthStandardId: 1, healthStandardName: "Thông tư 14" },
                { healthStandardId: 2, healthStandardName: "Thông tư 24" },
                { healthStandardId: 3, healthStandardName: "Đặc thù theo khách hàng" },
                { healthStandardId: 4, healthStandardName: "Khác" },
            ];
        }

        function openAddModal() {
            vm.userHealthCheck = { hsId: null, healthStandardName: null, yearOfhealthStandar: null, note: null };
            vm.modalTitle = "Thêm mới tiêu chuẩn khám";
        }
    }
})();