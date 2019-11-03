(function () {
    'use strict'
    angular.module('mainApp').controller('identificationCardSubTabController', identificationCardSubTabController);

    identificationCardSubTabController.$inject = ['$http', '$rootScope', '$scope', '$state','$stateParams'];

    function identificationCardSubTabController($http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAddModal = openAddModal;
        vm.openEditModal = openEditModal;
        vm.saveChanges = saveChanges;
        vm.openDeleteModal = openDeleteModal;
        vm.deletedIdentificationCard = deletedIdentificationCard;


        vm.isValid = false;
        var userId = $state.params.id;
        vm.IsViewing = $stateParams.IsViewing;

        function resetModel() {
            vm.userIdentificationCard = {
                Id: 0, Number: null, IdentityTypeId: null, TypeDisplay: null, DateReleased: null, PlaceReleased: null, PersonId :userId
            };

        }

        function initialize() {
            getTypesOfIdentificationCard();
            getIdentificationCards();
            
        }

        function getIdentificationCards() {
            $http.get('/api/Person/GetPersonIdentities', { params: { pid: userId } })
                .then(function (result) {
                    vm.identificationCards = result.data;
                    vm.identificationCards.forEach(function (item, index) {
                        switch (item.IdentityTypeId) {
                            case 1: item.TypeDisplay = "Chứng Minh Nhân Dân"; break;
                            case 2: item.TypeDisplay = "Passport"; break;
                            case 3: item.TypeDisplay = "Thẻ Căn Cước Công Dân"; break;
                        }

                        item.DateDisplay = new Date(item.DateReleased).toLocaleDateString('en-GB');
                    });
                });       
        }

        function getTypesOfIdentificationCard() {
            vm.typesOfIdentificationCard = [
                { typeId: 1, typeName: "Chứng minh nhân dân" },
                { typeId: 2, typeName: "Passport" },
                { typeId: 3, typeName: "Thẻ căn cước" },
            ];
        }

        function checkValid() {
            if (vm.userIdentificationCard.IdentityTypeId != null) {
                if (vm.userIdentificationCard.Number == "" || !vm.userIdentificationCard.Number) {
                    vm.message = "Không để trống mục này!";
                    vm.isValid = false;
                    return;
                }
                if (vm.userIdentificationCard.DateReleased == null || vm.userIdentificationCard.PlaceReleased == "" || !vm.userIdentificationCard.PlaceReleased) {
                    vm.message = "Không để trống mục này!";
                    vm.isValid = false;
                    return;
                }
                vm.message = null;
                vm.isValid = true;
                return;
            };
            vm.isValid = false;
        }

        function openAddModal() {
            resetModel();
            vm.modalTitle = "Thêm mới giấy tờ tùy thân";
            vm.isValid = false;

        }

        function openEditModal(row) {
            resetModel();
            vm.modalTitle = "Chỉnh sửa giấy tờ tùy thân";
            vm.userIdentificationCard = row;
            vm.isValid = true;
        }

        function saveChanges() {
            if (vm.userIdentificationCard.Id == 0) {
                $http.post('/api/Person/AddPersonIdentity', vm.userIdentificationCard)
                    .then(function (result) {
                        getIdentificationCards();
                    });
            } else {
                $http.post('/api/Person/UpdatePersonIdentity', vm.userIdentificationCard)
                    .then(function (result) {
                        getIdentificationCards();
                    });
            }
        }

        function openDeleteModal(row) {
            vm.selectedRow = row;
        }

        function deletedIdentificationCard(r) {
            $http.post('/api/Person/DeletePersonIdentity', r)
                .then(function (result) {
                    getIdentificationCards();
                });

        }

    };
})();