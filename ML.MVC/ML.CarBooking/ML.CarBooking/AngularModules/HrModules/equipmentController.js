(function () {
    'use strict'
    angular.module('mainApp')
        .controller('equipmentController', equipmentController);

    equipmentController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams'];
    function equipmentController($http , $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.save = save;
        //vm.IsViewing = $stateParams.params.IsViewing;
        var personId = $stateParams.id;

        function initialize() {
            getEquipmentsByUserId(personId);
        }


        function getEquipments() {
            vm.PersonEquipments = [];
            vm.PersonEquipments = E.Equipments;
            vm.PersonEquipments.forEach(function (item, index) {
                item.IsChecked = false;
                item.IsEnabled = false;
                item.PersonId = personId;
            });
            
        };

        function getEquipmentsByUserId(userId) {
            getEquipments();
            $http.get('/api/Person/GetPersonEquipments', { params: { pid: personId } })
                .then(function (result) {
                    var data = result.data;
                    if (data && data.length > 0) {
                        vm.PersonEquipments.forEach(function (item, index) {
                            var select = data.find(x => x.EquipmentId == item.Id);
                            if (select) {
                                item.IsChecked = true;
                                item.ReceivedDate = select.ReceivedDate;
                            }
                        });
                    }
                });
        };

        function save(row) {
            $http.post('/api/Person/CreateOrUpdatePersonEquipment', row)
                .then(function (result) {
                    alert('Lưu Thông Tin Thành Công');
                });
        };


    }




})();