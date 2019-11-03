(function () {
    'use strict'
    angular.module('mainApp').controller('healthInsuranceController', healthInsuranceController);

    healthInsuranceController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams'];

    function healthInsuranceController($http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.createPersonHealthInsurance = createPersonHealthInsurance;
        vm.updatePersonHealthInsurance = updatePersonHealthInsurance;
        vm.saveChanges = saveChanges;
        vm.openDeleteModal = openDeleteModal;
        vm.deletePersonHealthInsurance = deletePersonHealthInsurance;

        vm.isAdding = false;
        vm.isEditing = false;
        vm.isDeleting = false;
        vm.isValid = false;
        vm.personHealthInsurances = [];

        vm.IsViewing = $stateParams.IsViewing;

        var personId = $stateParams.id;
        var deleteRow = { id: null, index: null };

        function initialize() {
            resetModel();
            getPersonHealthInsurances();
        };

        function resetModel() {
            vm.personHealthInsurance = {
                Id: 0,
                PersonId: personId,
                FromDate: null,
                ToDate: null,
                Amount: 0,
                Duration: 0,
                IsDeleted: false
            };
        }

        function getPersonHealthInsurances() {
            $http.get('/api/PersonSalaryInformation/GetPersonHealthInsurances', { params: { pid: personId } })
                .then(function (result) {
                    vm.personHealthInsurances = result.data;
                });
        }

        function createPersonHealthInsurance() {
            resetModel();
            vm.isAdding = !vm.isAdding;
        }

        function updatePersonHealthInsurance(row ,$index) {
            resetModel();
            vm.personHealthInsurance.Id = row.Id;
            vm.personHealthInsurance.FromDate = row.FromDate;
            vm.personHealthInsurance.ToDate = row.ToDate;
            vm.personHealthInsurance.Amount = row.Amount;
            vm.personHealthInsurance.Duration = row.Duration;
            vm.personHealthInsurance.IsDeleted = row.IsDeleted;
            vm.personHealthInsurance.Index = $index;
            row.isEditing = true;
            vm.isEditing = true;
        }

        function saveChanges() {
            debugger;
            $http.post('/api/PersonSalaryInformation/CreateOrUpdatePersonHealthInsurance', vm.personHealthInsurance)
                .then(function (result) {
                    debugger;
                        if (result.data > 0) {
                            vm.isAdding = false;
                            vm.isEditing = false;
                            alert('Lưu Thông Tin Thành Công !');
                            if (vm.personHealthInsurance.IsDeleted == true) {
                                vm.personHealthInsurances.splice(vm.personHealthInsurance.Index, 1);
                                return;
                            }
                            if (vm.personHealthInsurance.Id == 0) {
                                vm.personHealthInsurance.Id = result.data;
                                vm.personHealthInsurances.splice(0, 0, angular.copy(vm.personHealthInsurance));
                            } else {
                                vm.personHealthInsurance.isEditing = false;
                                vm.personHealthInsurances.splice($index, 1, angular.copy(vm.personHealthInsurance));
                            }
                        }
                    });
        }

        function checkValid() {
            vm.isValid = false;
            if ((vm.isAdding || vm.isEditing)
                && (!vm.personHealthInsurance.Amount == 0
                || vm.personHealthInsurance.Duration == 0
                    || vm.personHealthInsurance.FromDate == null
                || !vm.personHealthInsurance.ToDate == null)) return;
            vm.isValid = true;
        }

        function openDeleteModal(row, $index) {
            resetModel();
            vm.personHealthInsurance.Id = row.Id;
            vm.personHealthInsurance.FromDate = row.FromDate;
            vm.personHealthInsurance.ToDate = row.ToDate;
            vm.personHealthInsurance.Amount = row.Amount;
            vm.personHealthInsurance.Duration = row.Duration;
            vm.personHealthInsurance.Index = $index;
        }

        function deletePersonHealthInsurance() {
            vm.personHealthInsurance.IsDeleted = true;
            saveChanges();
        }
    }
})();