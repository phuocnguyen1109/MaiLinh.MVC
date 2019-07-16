(function () {
    'use strict'
    angular.module('mainApp').controller('workingHistoriesController', workingHistoriesController);

    function workingHistoriesController($rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;

        function initialize() {
            getworkingHistories();
        }

        function getworkingHistories() {
            //TODO: get data by api
            var workingHistories = [
                { id: "1", startDate: "01/01/2016", endDate: "12/12/2018", companyName: "Công Ty TNHH MTV ABC" },
                { id: "2", startDate: "01/01/2019", endDate: "30/05/2019", companyName: "Công Ty TNHH MTV DEF" },
            ];
            vm.workingHistories = workingHistories;
            console.log(vm.workingHistories);
        }


        $scope.addWorkingHistory = function addWorkingHistory(newWh) {
            vm.workingHistories.push(newWh);
            console.log(vm.workingHistories);
            $scope.newWh = null;
        }
    }

})();