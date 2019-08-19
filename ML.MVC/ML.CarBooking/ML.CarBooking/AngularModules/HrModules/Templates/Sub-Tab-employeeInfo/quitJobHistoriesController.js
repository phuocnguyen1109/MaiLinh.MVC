(function () {
    'use strict'
    angular.module('mainApp').controller('quitJobHistoriesController', quitJobHistoriesController);

    quitJobHistoriesController.$inject = ['$http', '$rootScope', '$scope', '$state','$stateParams'];

    function quitJobHistoriesController($http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.addNewDetail = addNewDetail;
        vm.editDetail = editDetail;
        vm.saveChanges = saveChanges;
        vm.openDeleteModal = openDeleteModal;
        vm.deletedHistories = deletedHistories;

        vm.isAdding = false;
        vm.isDeleting = false;
        vm.isValid = false;
        vm.IsViewing = $stateParams.IsViewing;

        function initialize() {
            getQuitJobHistories();
            vm.newQuittingJob = { id: null, startWorkingDate: null, signingDate: null, quittingDate: null, reason: null };
        };

        function getQuitJobHistories() {
            //TO DO: get api here
            vm.quitJobHistories = [
                { id: 1, startWorkingDate: "01/26/2019", signingDate: "01/31/2019", quittingDate: "07/27/2019", reason: "Nghỉ bệnh!" },
            ];
        }

        function addNewDetail() {
            vm.newQuittingJob = { id: null, startWorkingDate: null, signingDate: null, quittingDate: null, reason: null };
            vm.isAdding = !vm.isAdding;
        }

        function editDetail(row) {
            vm.newQuittingJob = {
                id: row.id,
                startWorkingDate: new Date(row.startWorkingDate),
                signingDate: new Date(row.signingDate),
                quittingDate: new Date(row.quittingDate),
                reason: row.reason
            };
            vm.isAdding = !vm.isAdding;
        }

        function formattedDate(date) {
            var format = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            return format;
        }

        function saveChanges() {
            var r = vm.newQuittingJob;
            if (r.id) {
                vm.quitJobHistories.forEach(function (item, index) {
                    if (r.id == item.id) {
                        item.startWorkingDate = formattedDate(r.startWorkingDate);
                        item.signingDate = formattedDate(r.signingDate);
                        item.quittingDate = formattedDate(r.quittingDate);
                        item.reason = r.reason;
                        return;
                    }
                });
            } else {
                var newId = new Date();
                newId = newId.getMilliseconds().toString();
                vm.newQuittingJob = {
                    id: newId,
                    startWorkingDate: formattedDate(r.startWorkingDate),
                    signingDate: formattedDate(r.signingDate),
                    quittingDate: formattedDate(r.quittingDate),
                    reason: r.reason
                }
                vm.quitJobHistories.push(vm.newQuittingJob);
            }
            vm.isAdding = false;
        }

        function checkValid() {
            if (vm.reasonForDelete == "" || vm.reasonForDelete == null) {
                vm.message = "Nhập lý do xóa lịch sử nghỉ việc!";
                vm.isValid = false;
                return;
            }
            vm.message = null;
            vm.isValid = true;
        }

        function openDeleteModal(r) {
            vm.deletedRow = r;
            vm.isValid = false;
            vm.reasonForDelete = null;
        }

        function deletedHistories() {
            //debugger;
            vm.quitJobHistories.forEach(function (i, index) {
                if (i.id == vm.deletedRow.id) {
                    vm.quitJobHistories.splice(index, 1);
                    return;
                }
            });
        }
    }
})();