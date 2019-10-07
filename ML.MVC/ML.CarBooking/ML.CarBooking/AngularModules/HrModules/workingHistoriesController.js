(function () {
    'use strict'
    angular.module('mainApp').controller('workingHistoriesController', workingHistoriesController);

    workingHistoriesController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams'];
    function workingHistoriesController($http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAddModal = openAddModal
        vm.openEditWokingHistory = openEditWokingHistory;
        vm.openDeleteMModal = openDeleteMModal;
        vm.saveChanges = saveChanges;
        vm.deleted = deleted;

        vm.isValid = false;
        var userId = $state.params.id;
        vm.IsViewing = $state.params.IsViewing;


        function resetModel() {
            vm.userWorkingHistory = {
                Id: 0, PersonId: userId, FromDate: null, ToDate: null, CompanyName: null
            };
        }
        function initialize() {

            resetModel()
            getworkingHistories();
        }

        function getworkingHistories() {

            $http.get('/api/WorkingHistory/GetAllByPerson', { params: { personId: userId } })
                .then(function (result) {
                    vm.workingHistories = result.data;
                   
                });

        }


        function saveChanges() {
            $http.post('/api/WorkingHistory/CreateOrUpdate', vm.userWorkingHistory).
                then(function (result) {
                    getworkingHistories();
                });
        }

        function openAddModal() {
            resetModel();
            vm.modalTitle = "Thêm lịch sử công tác";
            
        }

        function checkValid() {
            if (vm.userWorkingHistory.FromDate != null && vm.userWorkingHistory.ToDate != null) {
                if (vm.userWorkingHistory.FromDate > vm.userWorkingHistory.ToDate) {
                    vm.message = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!";
                    vm.isValid = false;
                    return;
                }
                if (vm.userWorkingHistory.CompanyName == "" || !vm.userWorkingHistory.CompanyName) {
                    vm.message = "Nhập đầy đủ các mục!";
                    vm.isValid = false;
                    return;
                }
                vm.message = null;
                vm.isValid = true;
                return;
            }
            vm.isValid = false;
        }

        function openEditWokingHistory(r) {
            resetModel();
            vm.modalTitle = "Chỉnh sửa lịch sử công tác";
            vm.isValid = true;
            vm.userWorkingHistory = r;
            vm.userWorkingHistory.FromDate = new Date(r.FromDate);
            vm.userWorkingHistory.ToDate = new Date(r.ToDate);
        }

        function openDeleteMModal(row) {
            vm.deletedDataRow = row;
        }

        function deleted(r) {
            $http.post('/api/WorkingHistory/Delete', vm.userWorkingHistory)
                .then(function (result) {
                    getworkingHistories();
                });
        }
    }

})();