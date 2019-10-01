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
                PersonId: personId
            };
            vm.personDependance = {
                RelationshipId: 0,
                IsDependent: false,
                StartDate: null,
                EndDate: null,
            }
        }

        function loadMariageStatuses() {
            $http.get('/api/Mariage/GetMMariageStatuses')
                .then(function (response) {
                    if (response && response.data.length > 0) {
                        vm.mariageStatuses = response.data;
                        //console.log(vm.mariageStatuses);
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
            vm.Dependancers = [
                {
                    RelationShipId: 1,
                    IsDependent: false,
                    StartDate: null,
                    EndDate: null,
                },
                {
                    RelationShipId: 2,
                    IsDependent: true,
                    StartDate: '02/02/1990',
                    EndDate: '02/02/2032',
                }
            ];

        };

        function getRelatives() {
            $http.get('/api/Mariage/GetPersonRelationShips', { params: { pid: personId } }).then(function (result) {
                vm.personRelations = result.data;
                vm.personRelations.forEach(function (relation, index) {
                    loadRelationships();
                    relation.RelationName = vm.RelationShipTypes.find(x => x.Id == relation.RelationShipId).Name;
                    relation.Dependance = vm.Dependancers.find(x => x.RelationShipId == relation.RelationShipId);
                    console.log(vm.personRelations);
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

                if (vm.personDependance.IsDependent) {
                    if (vm.personDependance.StartDate && vm.personDependance.EndDate && vm.personDependance.StartDate < vm.personDependance.EndDate) {
                        vm.isValid = true;
                        vm.message = null;
                        return;
                    }
                } else {
                    vm.isValid = true;
                    vm.message = null;
                }
            }
            else {
                vm.isValid = false;
                vm.message = "Nhập đầy đủ các mục!";
                return;
            }
        };

        function saveRelative(relative) {

            if (relative.Id == 0) {
                vm.personDependance.RelationshipId = vm.personRelationship.RelationshipId;
                vm.Dependancers.push(vm.personDependance);
                console.log(vm.Dependancers);
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
            debugger;
            vm.personRelationship = {
                Id: relative.Id,
                RelationshipId: relative.RelationShipId,
                FullName: relative.FullName,
                YearOfBirth: relative.YearOfBirth,
                Address: relative.Address,
                IsDead: relative.IsDead,
                PersonId: personId
            };
            vm.personDependance = {
                RelationshipId: relative.RelationShipId,
                IsDependent: relative.Dependance ? true : false,
                StartDate: relative.Dependance.StartDate, //vì khai báo kiểu string nên k hiện date
                EndDate: relative.Dependance.EndDate,   //vì khai báo kiểu string nên k hiện date
            }

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
            if (r.IsDependent == undefined || !r.IsDependent) {
                return { 'color': 'black' };
            } else {
                return { 'color': 'green' };
            }

        }

    }
})();