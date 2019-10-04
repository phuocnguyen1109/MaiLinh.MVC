(function () {
    'use strict'
    angular.module('mainApp')
        .controller('bankAccountController', bankAccountController);

    bankAccountController.$inject = ['$http', '$scope', '$state', '$stateParams', 'PubSub', 'Upload'];

    function bankAccountController($http, $scope, $state, $stateParams, PubSub) {
        var vm = this;

        var personId = $stateParams.id;

        vm.initialize = initialize;
        vm.saveChanges = saveChanges;
        vm.openCreateModal = openCreateModal;
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.deletePersonBankAccount = deletePersonBankAccount;

        vm.personBankAccounts = [];
        vm.selectedRow = {};
        vm.isValid = false;
        vm.checkValid = checkValid;

        function initialize() {
            resetModel();
            getListBank();
            getPersonBankAccount();
        }

        function resetModel() {
            vm.selectedRow = {
                Id: 0,
                PersonId: personId,
                BankId: 0,
                AccountNumber: '',
                AccountName: ''
            };
        }

        function checkValid() {
            vm.isValid = false;
            if (vm.selectedRow.BankId == 0
                || vm.selectedRow.AccountName == ''
                || vm.selectedRow.AccountNumber == '') return;
            vm.isValid = true;
        }

        function getListBank() {
            vm.banks = E.Banks;
            vm.banks.splice(0, 0, { Id: 0, Name: '-- Chọn Ngân Hàng --' });
        }

        function getPersonBankAccount() {
            $http.get('/api/PersonSalaryInformation/GetPersonBankAccount', { params: { pid: personId } })
                .then(function (result) {
                    vm.personBankAccounts = result.data;
                    vm.personBankAccounts.forEach(function (item, index) {
                        item.BankName = vm.banks.find(x => x.Id == item.BankId).Name;
                    });
                });
        }

        function openCreateModal() {
            resetModel();
            vm.modelTilte = 'Thêm Mới Tài Khoản';
        }

        function openEditModal(row, $index) {
            resetModel();
            vm.modelTilte = 'Sửa Thông Tin Tài Khoản';
            vm.selectedRow.Id = row.Id;
            vm.selectedRow.BankId = row.BankId;
            vm.selectedRow.AccountName = row.AccountName;
            vm.selectedRow.AccountNumber = row.AccountNumber;
            vm.selectedRow.index = $index;
        }

        function saveChanges() {
            if (!vm.isValid) { return }
            $http.post('/api/PersonSalaryInformation/CreateOrUpdatePersonBankAccount', vm.selectedRow)
                .then(function (result) {
                    if (result.data == 0) {
                        alert('Không thể lưu thông tin ! Vui lòng liên hệ admin');
                        return;
                    }
                    alert('Lưu Thông Tin Thành Công');
                    getPersonBankAccount();
                })
        }

        function openDeleteModal(row, $index) {
            resetModel();
            vm.selectedRow.Id = row.Id;
            vm.selectedRow.index = $index;
        }

        function deletePersonBankAccount() {
            $http.post('/api/PersonSalaryInformation/DeletePersonBankAccount', vm.selectedRow)
                .then(function (result) {
                    if (result.data > 0) {
                        vm.personBankAccounts.splice(vm.selectedRow.index, 1);
                        alert('Xóa Thông Tin Tài Khoản Thành Công');
                        resetModel();
                    }
                });
        }
    
    }
})();