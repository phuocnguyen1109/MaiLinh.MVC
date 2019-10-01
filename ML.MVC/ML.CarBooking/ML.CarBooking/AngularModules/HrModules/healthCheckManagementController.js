(function () {
    'use strict'
    angular.module('mainApp').controller('healthCheckManagementController', healthCheckManagementController);

    healthCheckManagementController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams'];
    function healthCheckManagementController( $http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.openAddModal = openAddModal;
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.deletePersonHealthCheck = deletePersonHealthCheck;
        //vm.IsViewing = $stateParams.params.IsViewing;

        var personId = $stateParams.id;
        var selectedRow = { id: null, index: null };

        function initialize() {
            getHealthStandards();
            getHealthChecks();

        }

        function getHealthChecks() {
            $http.get('/api/HealthCheck/GetPersonHealthCheck', { params: { pid : personId } })
                .then(function (response) {
                    vm.personHealthCheck = response.data;
                    vm.personHealthCheck.forEach(function (item, index) {
                        item.StandardNames = '';
                        var ids = item.StandardIds.split(',');
                        for (var i = 0; i < ids.length; i++) {
                            item.StandardNames += vm.healthStandards.find(x => x.Id == ids[i]).Name;
                            if (i != ids.length - 1) {
                                item.StandardNames += '<br/>';
                            }
                        }
                    });
                });
            
        }

        function getHealthStandards() {
            vm.healthStandards = [];
            vm.healthStandards = E.HealthCheckStandard;
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
        function openDeleteModal(row, $index) {
            selectedRow.id = row.Id;
            selectedRow.index = $index;
        }

        function deletePersonHealthCheck() {
            $http.post('/api/HealthCheck/DeletePersonHealthCheck', { Id: selectedRow.id })
                .then(function (response) {
                    if (response.data > 0) {
                        vm.personHealthCheck.splice(selectedRow.index, 1);
                        selectedRow.id = null;
                        selectedRow.index = null;
                        alert('Xóa Mục Thành Công');
                    }
                });
        }
    }
})();