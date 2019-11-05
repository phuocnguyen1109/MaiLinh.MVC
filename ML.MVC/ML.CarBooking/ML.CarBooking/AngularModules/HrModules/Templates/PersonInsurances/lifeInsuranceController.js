(function () {
    'use strict'
    angular.module('mainApp')
        .controller('lifeInsuranceController', lifeInsuranceController);

    lifeInsuranceController.$inject = ['$http', '$scope', '$state', '$stateParams', 'PubSub', 'Upload', 'UtilityFactory'];

    function lifeInsuranceController($http, $scope, $state, $stateParams, PubSub, UtilityFactory) {
        var vm = this;

        var personId = $stateParams.id;

        vm.initialize = initialize;
        vm.saveChanges = saveChanges;
        vm.openCreateModal = openCreateModal;
        vm.openEditModal = openEditModal;
        vm.openDeleteModal = openDeleteModal;
        vm.deletePersonLifeInsurance = deletePersonLifeInsurance;

        vm.personLifeInsurances = [];
        vm.selectedRow = {};
        vm.isValid = false;
        vm.checkValid = checkValid;

        function initialize() {
            resetModel();
            getListJoinLevel();
            getPersonLifeInsurances();
        }

        function resetModel() {
            vm.selectedRow = {
                Id: 0,
                PersonId: personId,
                Number: '',
                JoinLevel: 0,
                FromDate: null,
                ToDate: null,
                Amount: 0
            };
        }

        function checkValid() {
            if (vm.selectedRow.Number == ''
                || vm.selectedRow.JoinLevel == 0
                || vm.selectedRow.FromDate == null
                || vm.selectedRow.ToDate == null
                || vm.selectedRow.Amount == 0) return false;
            return true;
        }

        function getListJoinLevel() {
            vm.JoinLevels = E.JoinLevel;
            vm.JoinLevels.splice(0, 0, { Id: 0, Name: '-- Chọn Mức Tham Gia --' });
        }

        function convertToCurrency(value) {
            var strValue = value.toString();
            if (strValue.length <= 3) {
                return strValue;
            }
            var splitedValues = strValue.split('');
            var result = '';
            var numberFirst = strValue.length % 3;
            //10000
            if (numberFirst > 0) {
                result += strValue.substr(0, numberFirst);
                result += '.';
            }
            var countset = 1;
            for (var i = numberFirst; i < strValue.length; i++) {
                result += splitedValues[i];
                countset++;
                if (countset == 4 && i < strValue.length - 1) {
                    result += '.';
                    countset = 1;
                }

            }

            return result;
        }

        function getPersonLifeInsurances() {
            $http.get('/api/PersonSalaryInformation/GetPersonLifeInsurances', { params: { pid: personId } })
                .then(function (result) {
                    vm.personLifeInsurances = result.data;
                    vm.personLifeInsurances.forEach(function (item, index) {
                        item.JoinLevelName = vm.JoinLevels.find(x => x.Id == item.JoinLevel).Name;
                        item.AmountDisplay = convertToCurrency(item.Amount);
                        console.log(item.AmountDisplay);
                    });
                });
        }

        function openCreateModal() {
            resetModel();
            vm.modelTilte = 'Thêm Mới Bảo Hiểm';
        }

        function openEditModal(row, $index) {
            resetModel();
            vm.modelTilte = 'Sửa Thông Tin Bảo Hiểm';
            vm.selectedRow.Id = row.Id;
            vm.selectedRow.JoinLevel = row.JoinLevel;
            vm.selectedRow.Number = row.Number;
            vm.selectedRow.FromDate = row.FromDate;
            vm.selectedRow.ToDate = row.ToDate;
            vm.selectedRow.Amount = row.Amount;
            vm.selectedRow.Index = $index;
        }

        function saveChanges() {
            $http.post('/api/PersonSalaryInformation/CreateOrUpdatePersonLifeInsurance', vm.selectedRow)
                .then(function (result) {
                    if (result.data == 0) {
                        alert('Không thể lưu thông tin ! Vui lòng liên hệ admin');
                        return;
                    }
                    alert('Lưu Thông Tin Thành Công');
                    getPersonLifeInsurances();
                })
        }

        function openDeleteModal(row, $index) {
            resetModel();
            vm.selectedRow.Id = row.Id;
            vm.selectedRow.index = $index;
        }

        function deletePersonLifeInsurance() {
            $http.post('/api/PersonSalaryInformation/DeletePersonLifeInsurance', vm.selectedRow)
                .then(function (result) {
                    if (result.data > 0) {
                        vm.personLifeInsurances.splice(vm.selectedRow.index, 1);
                        alert('Xóa Thông Tin Tài Khoản Thành Công');
                        resetModel();
                    }
                });
        }

    }
})();