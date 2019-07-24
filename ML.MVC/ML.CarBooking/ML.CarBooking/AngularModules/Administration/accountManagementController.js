(function () {
    'use strict'
    angular.module('mainApp')
        .controller('accountManagementController', accountManagementController);

    function accountManagementController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;

        function initialize() {
            getAccounts();
        }

        function getAccounts() {
            var accounts = [
                { id: "1", startDate: "01/01/2016", endDate: "12/12/2018", companyName: "Công Ty TNHH MTV ABC" },
                { id: "2", startDate: "01/01/2019", endDate: "30/05/2019", companyName: "Công Ty TNHH MTV DEF" },
            ];
            vm.accounts = accounts;
            console.log(vm.accounts);
        }

    }
})();