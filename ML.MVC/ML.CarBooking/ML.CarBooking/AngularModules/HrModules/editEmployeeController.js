(function () {
    'use strict'
    angular.module('mainApp')
        .controller('editEmployeeController', editEmployeeController);

    editEmployeeController.$inject = ['$http', '$scope', '$state', '$stateParams'];
    function editEmployeeController($http, $scope, $state, $stateParams) {
        var vm = this;
        var personId = $stateParams.id;

        vm.initialize = initialize;

        function initialize() {
            getMasterData();
            getPerson();
        }

        function getPerson() {
            $http.get('/api/Person/GetPersonInformation', { params: { id: personId } })
                .then(function (result) {
                    if (result.data) {
                        vm.person = result.data;
                        }
                });
        }

        function getMasterData() {
            vm.placeOfBirth = [
                { id: 1, name: 'Hồ Chí Minh' },
                { id:2, name: 'Hà Nội'}
                ];
        }


    }
})();