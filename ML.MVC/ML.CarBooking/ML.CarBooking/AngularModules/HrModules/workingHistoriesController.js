(function () {
    'use strict'
    angular.module('mainApp').controller('workingHistoriesController', workingHistoriesController);

    workingHistoriesController.$inject = ['$http', '$rootScope', '$scope', '$state'];

    function workingHistoriesController( $http, $rootScope, $scope, $state) {
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


        vm.addWorkingHistory = function addWorkingHistory(newWh) {
            var newId = new Date();
            newId = newId.getMilliseconds();
            newWh.id = newId;

            vm.workingHistories.push(newWh);
            console.log(vm.workingHistories);
            $scope.newWh = null;
        }

        function add() {
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

        vm.editWokingHistory = function editWokingHistory(workingHistory) {
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