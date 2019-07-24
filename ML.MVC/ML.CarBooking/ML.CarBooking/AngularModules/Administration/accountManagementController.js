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
                { id: "1", lastName: "Nguyễn", firstName: "Ngọc", userName: "s1" },
                { id: "2", lastName: "Nguyễn", firstName: "Ngọc Ngọc", userName: "s2" },
            ];
            vm.accounts = accounts;
            console.log(vm.accounts);
        }

    }
})();