(function () {
    'use strict'
    angular.module('mainApp').controller('quitJobHistoriesController', quitJobHistoriesController);

    quitJobHistoriesController.$inject = ['$http', '$rootScope', '$scope', '$state','$stateParams'];

    function quitJobHistoriesController($http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.createPersonWorkLeaveHistory = createPersonWorkLeaveHistory;
        vm.updatePersonWorkLeaveHistory = updatePersonWorkLeaveHistory;
        vm.saveChanges = saveChanges;
        vm.openDeleteModal = openDeleteModal;
        vm.deletePersonWorkLeaveHistory = deletePersonWorkLeaveHistory;

        vm.isAdding = false;
        vm.isEditing = false;
        vm.isDeleting = false;
        vm.isValid = false;
        vm.personWorkLeaveHistories = [];

        vm.IsViewing = $stateParams.IsViewing;

        var personId = $stateParams.id;
        var deleteRow = { id: null, index: null };

        function initialize() {
            resetModel();
            getPersonWorkLeaveHistory();
        };

        function resetModel() {
            vm.personWorkLeaveHistory = {
                Id: 0,
                PersonId: personId,
                StartDate: null,
                EndDate: null,
                ContractDate: null,
                Reason: null
            };
        }

        function getPersonWorkLeaveHistory() {
            $http.get('/api/WorkingHistory/GetPersonWorkLeaveHistory', { params: { pid: personId } })
                .then(function (result) {
                    vm.personWorkLeaveHistories = result.data;
                });
        }


        function createPersonWorkLeaveHistory() {
            return $http.get('/api/WorkingHistory/GetPersonProcessDateTime', { params: { pid: personId } })
                .then(function (result) {
                    vm.personWorkLeaveHistory = {
                        Id: 0,
                        PersonId: personId,
                        StartDate: new Date(result.data.StartDate),
                        EndDate: null ,
                        ContractDate: new Date(result.data.JoinDate),
                        Reason: null
                    };
                    vm.isAdding = !vm.isAdding;
                });
           
        }

        function updatePersonWorkLeaveHistory(row) {
            vm.personWorkLeaveHistory.Id = row.Id;
            vm.personWorkLeaveHistory.StartDate = new Date(row.StartDate);
            vm.personWorkLeaveHistory.ContractDate = new Date(row.ContractDate);
            vm.personWorkLeaveHistory.EndDate = new Date(row.EndDate);
            vm.personWorkLeaveHistory.Reason = row.Reason;
            vm.personWorkLeaveHistory.PersonId = personId;
            row.isEditing = true;
            vm.isEditing = true;
        }

        function saveChanges($index) {
            if (vm.personWorkLeaveHistory.Id == 0) {
                //add
                
                $http.post('/api/WorkingHistory/CreatePersonWorkLeaveHistory', vm.personWorkLeaveHistory)
                    .then(function (result) {
                        if (result.data > 0) {
                            vm.isAdding = false;
                            vm.personWorkLeaveHistory.Id = result.data;
                            vm.personWorkLeaveHistories.splice(0, 0, angular.copy(vm.personWorkLeaveHistory));
                            vm.isEditing = false;
                            alert('Lưu Thông Tin Thành Công !');
                        }
                    });
            } else {
                //update
                $http.post('/api/WorkingHistory/UpdatePersonWorkLeaveHistory', vm.personWorkLeaveHistory)
                    .then(function (result) {
                        if (result.data > 0) {
                            vm.isAdding = false;
                            vm.personWorkLeaveHistory.isEditing = false;
                            vm.personWorkLeaveHistories.splice($index, 1, angular.copy(vm.personWorkLeaveHistory));
                            resetModel();
                            vm.isEditing = false;
                            alert('Lưu Thông Tin Thành Công !');
                        }
                    });
            }
        }

        function checkValid() {
            vm.isValid = false;
            if ((vm.isAdding || vm.isEditing)
                && (!vm.personWorkLeaveHistory.StartDate
                    || !vm.personWorkLeaveHistory.EndDate
                    || !vm.personWorkLeaveHistory.ContractDate)) return;
            vm.isValid = true;
        }

        function openDeleteModal(row, $index) {
            deleteRow.id = row.Id;
            deleteRow.index = $index;
        }

        function deletePersonWorkLeaveHistory() {
            var params = { Id: deleteRow.id };
            $http.post('/api/WorkingHistory/DeletePersonWorkLeaveHistory', params)
                .then(function (result) {
                    if (result.data > 0) {
                        vm.personWorkLeaveHistories.splice(deleteRow.index, 1);
                        deleteRow.id = null;
                        deleteRow.index = null;
                    }
                });
        }
    }
})();