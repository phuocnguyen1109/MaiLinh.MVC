(function () {
    'use strict'
    angular.module('mainApp').controller('workingHistoriesController', workingHistoriesController);

    function workingHistoriesController($rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.add = add;



        vm.isValid = false;
       

        function initialize() {
            vm.userWorkingHistory = {
                startDate: null, endDate: null, companyName: null
            };
            getworkingHistories();
        }

        function getworkingHistories() {
            //TODO: get data by api
            vm.workingHistories = [
                { id: "1", startDate: "01/01/2016", endDate: "12/12/2018", companyName: "Công Ty TNHH MTV ABC" },
                { id: "2", startDate: "01/01/2019", endDate: "05/30/2019", companyName: "Công Ty TNHH MTV DEF" },
            ];
            console.log("workingHistories => " + vm.workingHistories);
        }


        vm.addWorkingHistory = function addWorkingHistory(newWh) {
            var newId = new Date();
            newId = newId.getMilliseconds();
            newWh.id = newId.toString();

            vm.workingHistories.push(newWh);
            console.log(vm.workingHistories);
        }

        function add() {
            vm.userWorkingHistory = {
                startDate: null, endDate: null, companyName: null
            };
            vm.modalTitle = "Thêm mới lịch sử công tác";
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

        vm.editWokingHistory = function editWokingHistory(workingHistory) {
            vm.modalTitle = "Chỉnh sửa lịch sử công tác";
            vm.isValid = true;
            var sDate = new Date(workingHistory.startDate);
            var eDate = new Date(workingHistory.endDate);
            console.log(sDate);
            vm.userWorkingHistory = {
                startDate: sDate, endDate: eDate, companyName: workingHistory.companyName
            };
        }
    }

})();