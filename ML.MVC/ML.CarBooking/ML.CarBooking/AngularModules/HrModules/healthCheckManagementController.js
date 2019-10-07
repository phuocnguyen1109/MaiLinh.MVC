(function () {
    'use strict'
    angular.module('mainApp').controller('healthCheckManagementController', healthCheckManagementController);

    healthCheckManagementController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams','$sce'];
    function healthCheckManagementController( $http, $rootScope, $scope, $state, $stateParams, $sce) {
        var vm = this;
        vm.initialize = initialize;
        vm.openAddModal = openAddModal;
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.checkValid = checkValid;
        vm.deletePersonHealthCheck = deletePersonHealthCheck;
        vm.saveChanges = saveChanges;
        //vm.IsViewing = $stateParams.params.IsViewing;

        vm.isValid = false;
        vm.isEditing = false;

        var personId = $stateParams.id;
        
        var selectedRow = { id: null, index: null };

        function initialize() {
            getHealthStandards();
            getHealthChecks();

        }

        function saveChanges() {
            vm.selectedPersonHealthCheck.StandardIds = angular.copy(vm.healthStandards).filter(x => x.IsChecked)
                .map(y => y.Id);
            $http.post('/api/HealthCheck/CreateOrUpdateHealthStandard', vm.selectedPersonHealthCheck)
                .then(function (response) {
                    alert('Lưu thông tin khám sức khỏe thành công !');
                    vm.healthStandards.forEach(function (item, index) {
                        item.IsChecked = false;
                    });
                    getHealthChecks();
                    vm.isEditing = false;
                    vm.isValid = false;
                });

        }

        function checkValid() {
            vm.isValid = false;
            var isExistsStdChecked = vm.healthStandards.some(x => x.IsChecked);
            if (!isExistsStdChecked) return;
            if (isNaN(vm.selectedPersonHealthCheck.Year) || vm.selectedPersonHealthCheck <= 0) return;
            vm.isValid = true;
        }

        function resetModel() {
            vm.selectedPersonHealthCheck = {
                Id: 0,
                Year: 0,
                Note: null,
                StandardIds: [],
                PersonId: personId
            };
            vm.isEditing = false;
        }

        function getHealthChecks() {
            $http.get('/api/HealthCheck/GetPersonHealthCheck', { params: { pid : personId } })
                .then(function (response) {
                    vm.personHealthCheck = response.data;
                    vm.personHealthCheck.forEach(function (item, index) {
                        item.StandardNames = '';
                        var ids = item.StandardIds.split(',');
                        item.stdIds = ids;
                        for (var i = 0; i < ids.length; i++) {
                            item.StandardNames += vm.healthStandards.find(x => x.Id == ids[i]).Name;
                            if (i != ids.length - 1) {
                                item.StandardNames += '<br/>';
                            }
                        }
                            item.StandardNames = $sce.trustAsHtml(item.StandardNames);
                    });
                });
            
        }

        function getHealthStandards() {
            vm.healthStandards = [];
            vm.healthStandards = E.HealthCheckStandard;
            vm.healthStandards.forEach(function (item, index) {
                item.IsChecked = false;
            });
        }

        function openAddModal() {
            resetModel();
            vm.modalTitle = "Thêm mới tiêu chuẩn khám";
        }

        function openEditModal(row) {
            vm.isEditing = true;
            vm.isValid = true;
            vm.selectedPersonHealthCheck = angular.copy(row);
            vm.selectedPersonHealthCheck.PersonId = personId;
            row.stdIds.forEach(function (item, index) {
                vm.healthStandards.find(x => x.Id == item).IsChecked = true;
            });
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