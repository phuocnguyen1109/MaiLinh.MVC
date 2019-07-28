(function () {
    'use strict'
    angular.module('mainApp').controller('employeesController', employeesController);

    employeesController.$inject = ['$http', '$rootScope', '$scope', '$state'];

    function employeesController($http, $rootScope, $scope, $state) {
        //local variables
        var vm = this;
        var tempEmployees = [];
        var selectedId;
        //biding variables
        
        vm.createModel = {
            firstName: null,
            lastName: null,
            userName: null,
            gender: 1
        };
        vm.createValid = false;


        //biding functions
        vm.gotoEdit = gotoEdit;
        vm.initialize = initialize;
        vm.checkSelected = checkSelected;
        vm.rowClick = rowClick;
        vm.filter = filter;
        vm.checkValidCreate = checkValidCreate;
        vm.createGenderChange = createGenderChange;
        vm.createSimplePerson = createSimplePerson;

        function initialize() {
            getPersons();

        }

        function filter() {
            if (!vm.filterText || vm.filterText == '') {
                vm.employees = tempEmployees;
                return;
            }
            vm.employees = vm.employees.filter(function (item) {
                return item.FirstName.includes(vm.filterText) || item.LastName.includes(vm.filterText)
            });
        }

        function rowClick(row) {
            if (row) {
                row.IsSelected = !row.IsSelected;
                checkSelected();
            }
        }

        function checkSelected() {
            var selectedIds = angular.copy(vm.employees).filter(function (item) {
                return item.IsSelected;
            });

            if (selectedIds.length == 1) {
                selectedId = selectedIds[0].Id;
                vm.CanEdit = true;
                return;
            }

            vm.CanEdit = false;
        }

        function getPersons() {
            $http.get('/api/Person/GetAllPerson')
                .then(function (result) {
                    vm.employees = result.data;
                    vm.employees.forEach(function (person, index) {
                        person.dobDisplay = person.DoB.toString() != '0001-01-01T00:00:00' ? new Date(person.DoB).toLocaleDateString('en-GB') : '';
                        person.StartDateDisplay = person.StartDate.toString() != '0001-01-01T00:00:00' ? new Date(person.StartDate).toLocaleDateString('en-GB') : '';
                        person.IsSelected = false;
                    });
                    tempEmployees = angular.copy(vm.employees);

                });
        }

        function gotoEdit() {
            
            $state.go('editEmployee', { id: selectedId });
        }

       

        function checkValidCreate() {
            var userNameValid = false;
            if (vm.createModel.userName && vm.createModel.userName != '') {
                if (vm.createModel.userName.includes(' ')) {
                    vm.message = 'Tên Đăng Nhập Không Được chứa khoảng trắng';
                    return;
                }
                userNameValid = true;
            }
            if (!vm.createModel.firstName || !vm.createModel.firstName != ''
                || !vm.createModel.lastName || !vm.createModel.lastName != ''
                || !userNameValid) {
                vm.message = "Cần Nhập Đẩy Đủ Thông Tin";
                return;
            }
            vm.createValid = true;
            vm.message = null;
        }

        function createGenderChange(gender) {
            vm.createModel.gender = gender;
        }

        function createSimplePerson() {
            if (!vm.createValid) {
                return;
            }

            $http.post('/api/Person/CreateSimple', vm.createModel)
                .then(function (result) {
                    if (result.data) {
                        $state.go('editEmployee', { id: result.data });
                    }
                });

        }
    }

})();