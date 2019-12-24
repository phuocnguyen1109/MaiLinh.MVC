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
            employeeCode: '',
            isMale: 'true'
        };

        vm.createValid = false;

        vm.roles = E.Roles;


        //biding functions
        vm.gotoEdit = gotoEdit;
        vm.gotoView = gotoView;
        vm.initialize = initialize;
        vm.checkSelected = checkSelected;
        vm.rowClick = rowClick;
        vm.filter = filter;
        vm.checkValidCreate = checkValidCreate;
        vm.createSimplePerson = createSimplePerson;
        vm.checkEmployeeCode = checkEmployeeCode;
        vm.checkValidEmployeeCode = checkValidEmployeeCode;
        vm.searchEmployee = searchEmployee;

        vm.isValidEmployeeCode = false;

        function initialize() {
            getPersons();
        }

        function searchEmployee() {
            if (!vm.filterText || vm.filterText == '') {
                getPersons();
                return;
            }
            $http.get('/api/Person/GetPersonBySearchCritical', { params: { filter: vm.filterText } })
                .then(function (result) {
                    vm.employees = result.data;
                    vm.employees.forEach(function (person, index) {
                        person.IsSelected = false;
                        person.Role = vm.roles.find(x => x.id == person.RoleId).name;
                    });
                });
        }

        function checkValidEmployeeCode() {
            vm.employeeCodeIsNumber = false;
            vm.isValidEmployeeCode = false;
            if (vm.createModel.employeeCode != '' && isNaN(vm.createModel.employeeCode)) {
                vm.checkEmployeeCodeMessage = 'Mã Nhân Viên Chỉ Được Phép Nhập Số';
                return;
            }
            vm.checkEmployeeCodeMessage = '';
            vm.employeeCodeIsNumber = true;
        }

        function checkEmployeeCode() {
            if (!vm.createModel.employeeCode || vm.createModel.employeeCode == '' || !vm.employeeCodeIsNumber || vm.createModel.employeeCode.length != 6) return;
            $http.get('/api/Person/CheckEmployeeCode', { params: { employeeCode: vm.createModel.employeeCode } })
                .then(function (result) {
                    if (result.data == 1) {
                        vm.checkEmployeeCodeMessage = 'Mã Nhân Viên Hợp Lệ';
                        vm.isValidEmployeeCode = true;
                        checkValidCreate();
                        return;
                    }
                    vm.checkEmployeeCodeMessage = 'Mã Nhân Viên Đã Tồn Tại!';
                    vm.isValidEmployeeCode = false;
                    checkValidCreate();
                });
        }

        function gotoView() {
            $state.go('editEmployee', { id: selectedId, IsViewing: true });

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
                        person.IsSelected = false;
                        person.Role = vm.roles.find(x => x.id == person.RoleId).name;
                    });
                    tempEmployees = angular.copy(vm.employees);

                });
        }

        function gotoEdit() {
            $state.go('editEmployee', { id: selectedId, IsViewing: false });
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
            if (!vm.createModel.firstName || vm.createModel.firstName == ''
                || !vm.createModel.lastName || vm.createModel.lastName == ''
                || !vm.createModel.employeeCode || vm.createModel.employeeCode ==''
                || !userNameValid) {
                vm.message = "Cần Nhập Đẩy Đủ Thông Tin";
                return;
            }
            vm.createValid = true;
            vm.message = null;
        }


        function createSimplePerson() {
            if (!vm.createValid) {
                return;
            }
            vm.createModel.gender = vm.createModel.isMale == 'true' ? 1 : 0;
            $http.post('/api/Person/CreateSimple', vm.createModel)
                .then(function (result) {
                    if (result.data) {
                        if (result.data > 0) {
                            $state.go('editEmployee', { id: result.data });
                        }
                        else {
                            alert('Mã Nhân Viên Đã Được Sử Dụng');
                        }
                    }
                });

        }

        function checkIdIsVailable() {
            vm.employees.forEach(function (person, index) {
                var id = parseInt(vm.createModel.id);
                if (id == person.Id) {
                    return vm.mess = "Mã nhân viên đã tồn tại!";
                }
                else {
                    return vm.mess = "Mã nhân viên có thể sử dụng";
                }
                vm.mess = null;
            });
 
        }
    }

    
})();