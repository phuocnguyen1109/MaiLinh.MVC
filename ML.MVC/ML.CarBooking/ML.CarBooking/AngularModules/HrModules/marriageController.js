(function () {
    'use strict'
    angular.module('mainApp')
        .controller('marriageController', marriageController);

    marriageController.$inject = ['$scope', '$http', '$state', '$stateParams'];

    function marriageController($scope, $http, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.gender = "male";
        vm.addNewRelative = addNewRelative;
        vm.checkValid = checkValid;
        vm.isValid = false;
        vm.saveRelative = saveRelative;
        vm.editRelative = editRelative;
        vm.openDelModel = openDelModel;
        vm.deleteRelationShip = deleteRelationShip;
        vm.checkIsDependent = checkIsDependent;
        var a = $scope;
        // vm.IsViewing = $stateParams.params.IsViewing;

        var personIsMale = true;
        var personId = $stateParams.id;

        vm.marriageStatusObject = { Id: null, marritalStatusName: null };


        function resetModel() {
            vm.personRelationship = {
                Id: 0,
                RelationshipId: 0,
                FullName: null,
                YearOfBirth: 0,
                Address: null,
                IsDead: false,
                IsDependent: false,
                DependentStart: null,
                DependentEnd: null,
                PersonId: personId
            };
        }

        function loadMariageStatuses() {
            $http.get('/api/Mariage/GetMMariageStatuses')
                .then(function (response) {
                    if (response && response.data.length > 0) {
                        vm.mariageStatuses = response.data;
                    }
                });
        }

        function loadRelationships() {
            if (!personIsMale) {
                vm.RelationShipTypes = angular.copy(E.RelationShipType).filter(x => x.Id != 4 && x.Id != 5); // Excludes 'Bố Chồng', 'Mẹ Chồng' 
            }
            vm.RelationShipTypes = angular.copy(E.RelationShipType).filter(x => x.Id != 6 && x.Id != 7); // Excludes 'Bố Vợ', 'Mẹ Vợ' 
            vm.RelationShipTypes.splice(0, 0, { Id: 0, Name: '--Chọn Mối Quan Hệ--' });
        }

        function initialize() {
            loadMariageStatuses();
            loadRelationships();
            getRelatives();

        };

        function getRelatives() {
            $http.get('/api/Mariage/GetPersonRelationShips', { params: { pid: personId } }).then(function (result) {
                vm.personRelations = result.data;
                debugger;
                vm.personRelations.forEach(function (relation, index) {
                    loadRelationships();
                    relation.RelationName = vm.RelationShipTypes.find(x => x.Id == relation.RelationShipId).Name;
                });

            });
        };

        function addNewRelative() {
            vm.isValid = false;
            resetModel();
            vm.personRelations.forEach(function (relation, index) {
                vm.RelationShipTypes.forEach(function (i, index) {
                    if (i.Id == relation.RelationShipId) {
                        vm.RelationShipTypes.splice(index, 1);
                        return;
                    }
                });
            });
        };

        function checkValid() {
            if (vm.personRelationship.FullName && vm.personRelationship.YearOfBirth && vm.personRelationship.Address && vm.personRelationship.RelationshipId) {
                vm.isValid = true;
            }
            else {
                vm.isValid = false;
                vm.message = "Nhập đầy đủ các mục!";
                return;
            }
        };

        function saveRelative(relative) {

            if (relative.Id == 0) {
                $http.post('/api/Mariage/Add', vm.personRelationship).then(function (result) {
                    resetModel();
                    getRelatives();
                });
            }
            else {
                $http.post('/api/Mariage/Update', vm.personRelationship).then(function (result) {
                    resetModel();
                    getRelatives();
                });
            }
        };

        function editRelative(relative) {
            vm.isValid = true;
            vm.personRelationship = {
                Id: relative.Id,
                RelationshipId: relative.RelationShipId,
                FullName: relative.FullName,
                YearOfBirth: relative.YearOfBirth,
                Address: relative.Address,
                IsDead: relative.IsDead,
                PersonId: personId,
                IsDependent: relative.IsDependent,
                DependentStart: new Date(relative.DependentStart),
                DependentEnd:new Date(relative.DependentEnd)
            };

        };

        function openDelModel(relative) {
            vm.relativeDel = relative;

        };

        function deleteRelationShip(relationship) {
            $http.post('/api/Mariage/Delete', relationship).then(function (result) {
                vm.relativeDel = null;
                getRelatives();
            });

        };

        function checkIsDependent(r) {
            if (!r) {
                return { 'color': 'black' };
            } else {
                return { 'color': 'green' };
            }

        }

    }
})();