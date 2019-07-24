(function () {
    'use strict'
    angular.module('mainApp').controller('workingHistoriesController', workingHistoriesController);

    workingHistoriesController.$inject = ['$http', '$rootScope', '$scope', '$state'];

    function workingHistoriesController( $http, $rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAddModal = openAddModal
        vm.openEditWokingHistory = openEditWokingHistory;
        vm.openDeleteMModal = openDeleteMModal;
        vm.saveChanges = saveChanges;
        vm.deleted = deleted;

        vm.isValid = false;


        function initialize() {
            vm.userWorkingHistory = {
                startDate: null, endDate: null, companyName: null
            };
            getworkingHistories();
        }

        function getworkingHistories() {
            //TODO: get data by api

            $http.get('/api/WorkingHistory/GetAllByPerson', { params: { personId: 1 } })
                .then(function (result) {
                    debugger;
                });

            var workingHistories = [
                { id: "1", startDate: "01/01/2016", endDate: "12/12/2018", companyName: "Công Ty TNHH MTV ABC" },
                { id: "2", startDate: "01/01/2019", endDate: "30/05/2019", companyName: "Công Ty TNHH MTV DEF" },
            ];
            vm.workingHistories = workingHistories;
            console.log(vm.workingHistories);
        }


        function saveChanges() {
            var r = vm.userWorkingHistory;
            var s = r.startDate.getMonth() + "/" + r.startDate.getDate() + "/" + r.startDate.getFullYear();
            var e = r.endDate.getMonth() + "/" + r.endDate.getDate() + "/" + r.endDate.getFullYear();
            if (r.id) {
                vm.workingHistories.forEach(function (item, index) {
                    if (r.id == item.id) {
                        item.startDate = s;
                        item.endDate = e;
                        item.companyName = r.companyName;
                    }
                    return;
                });
            } else {
                var newId = new Date();
                newId = newId.getMilliseconds().toString();
                vm.userWorkingHistory = {
                    id: newId, startDate: s, endDate: e, companyName: r.companyName
                };

                vm.workingHistories.push(vm.userWorkingHistory);
            };

            console.log(vm.workingHistories);
            $scope.newWh = null;
        }

        function openAddModal() {
            vm.userWorkingHistory = {
                startDate: null, endDate: null, companyName: null
            };
        }

        function checkValid() {
            if (vm.userWorkingHistory.startDate != null && vm.userWorkingHistory.endDate != null) {
                if (vm.userWorkingHistory.startDate > vm.userWorkingHistory.endDate) {
                    vm.message = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!";
                    vm.isValid = false;
                    return;
                }
                if (vm.userWorkingHistory.companyName == "" || !vm.userWorkingHistory.companyName) {
                    vm.message = "Nhập đầy đủ các mục!";
                    vm.isValid = false;
                    return;
                }
                vm.message = null;
                vm.isValid = true;
            }
        }

        function openEditWokingHistory(r) {
            vm.modalTitle = "Chỉnh sửa lịch sử công tác";
            vm.isValid = true;
            var sDate = new Date(r.startDate);
            var eDate = new Date(r.endDate);
            console.log(sDate);
            vm.userWorkingHistory = {
                id: r.id, startDate: sDate, endDate: eDate, companyName: r.companyName
            };

        }

        function openDeleteMModal(row) {
            vm.deletedDataRow = row;
            console.log(vm.deletedDataRow);
        }

        function deleted(r) {
            var deletedInndex = null;
            vm.workingHistories.forEach(function (item, index) {
                if (r.id == item.id) {
                    deletedInndex = index;
                }
            });
            vm.workingHistories.splice(deletedInndex, 1);
        }
    }

})();