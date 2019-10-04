(function () {
    'use strict'
    angular.module('mainApp')
        .controller('dependentController', dependentController);

    dependentController.$inject = ['$http', '$scope', '$state', '$stateParams', 'PubSub', 'Upload'];

    function dependentController($http, $scope, $state, $stateParams, PubSub) {
        var vm = this;

        var personId = $stateParams.id;

        vm.initialize = initialize;

        vm.personDependents = [];

        function initialize() {
            getPersonDependents();
        }

        function getPersonDependents() {
            $http.get('/api/PersonSalaryInformation/GetPersonDependents', { params: { pid: personId } })
                .then(function (result) {
                    debugger;
                    vm.personDependents = result.data;
                });
        }
    }
})();