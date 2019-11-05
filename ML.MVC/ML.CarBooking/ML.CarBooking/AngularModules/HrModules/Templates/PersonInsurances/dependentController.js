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

        var killDependentGridChange = null;

        function initialize() {
            getPersonDependents();
            PubSub.subscribe('MARRIAGE_GRID_CHANGE', killDependentGridChange);
        }

        killDependentGridChange = function () {
            getPersonDependents();
        }

        function getPersonDependents() {
            $http.get('/api/PersonSalaryInformation/GetPersonDependents', { params: { pid: personId } })
                .then(function (result) {
                    vm.personDependents = result.data;
                });
        }
    }
})();