(function () {
    'use strict'
    angular.module('mainApp')
        .controller('accountManagementController', accountManagementController);

    function accountManagementController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.addNewAccount = addNewAccount;
        vm.isValid = false;
        vm.checkValid = checkValid;
        vm.togglePassword = togglePassword;
        vm.isShow = false;
        vm.saveAccount = saveAccount;
        vm.editAccount = editAccount;
        vm.pw = null;
        vm.cpw = null;


        vm.departmentObject = { departmentId: null, departmentName: null };
        vm.titleObject = { titleId: null, titleName: null, departmentId: null };
        vm.employeeObject = { id: null, name: null};

        function initialize() {
            getAccounts();
            getDepartments();
            getTitles();
            getemployees();
            
        }

        function getAccounts() {
            var accounts = [
                { id: "1", lastName: "Nguyễn", firstName: "Ngọc", userName: "s1" },
                { id: "2", lastName: "Nguyễn", firstName: "Ngọc Ngọc", userName: "s2" },
                { id: "1", lastName: "Nguyễn", firstName: "Ngọc", userName: "s1" },
                { id: "2", lastName: "Nguyễn", firstName: "Ngọc Ngọc", userName: "s2" },
                { id: "1", lastName: "Nguyễn", firstName: "Ngọc", userName: "s1" },
                { id: "2", lastName: "Nguyễn", firstName: "Ngọc Ngọc", userName: "s2" },
                { id: "1", lastName: "Nguyễn", firstName: "Ngọc", userName: "s1" },
                { id: "2", lastName: "Nguyễn", firstName: "Ngọc Ngọc", userName: "s2" },
                { id: "1", lastName: "Nguyễn", firstName: "Ngọc", userName: "s1" },
                { id: "2", lastName: "Nguyễn", firstName: "Ngọc Ngọc", userName: "s2" },
                { id: "1", lastName: "Nguyễn", firstName: "Ngọc", userName: "s1" },
                { id: "2", lastName: "Nguyễn", firstName: "Ngọc Ngọc", userName: "s2" },
            ];
            vm.accounts = accounts;
        };
        function getemployees() {
            var employees = [
                { id: "1", name: "Nguyễn" },
                { id: "2", name: "Nguyễn Nguyễn" },
            ];
            vm.employees = employees;
        };

        function getDepartments () {
            vm.departments = [
                { departmentId: 1, departmentName: "Kế Toán" },
                { departmentId: 2, departmentName: "Kiểm Toán" },
                { departmentId: 3, departmentName: "Nhân Sự" },
            ]
        };

        function getTitles() {
            vm.titles = [
                { titleId: 1, titleName: "Trưởng Phòng Kế Toán", departmentId:1 },
                { titleId: 2, titleName: "Nhân Viên", departmentId: 1 },
                { titleId: 3, titleName: "Tập Sự", departmentId: 1 },
                { titleId: 1, titleName: "Trưởng Phòng Kiểm Toán", departmentId: 2 },
                { titleId: 1, titleName: "Trưởng Phòng Nhân Sự", departmentId: 3 },

            ]
        };

        function addNewAccount() {
            vm.employeeObject = { id: null, name: null };

            vm.pw = null;
            vm.cpw = null;
            vm.message = null;
            vm.isValid = false;
            vm.account = {
                id: null,
                lastName: null,
                firstName: null,
                email: null,
                userName: null,
                createdDate: null,
                createdBy: null,
                updatedDate: null,
                updatedBy: null,
                titleId: null,
                departmentId: null,
            };
        };

        function checkValid() {
            if (vm.account.userName && vm.account.email && vm.account.departmentId && vm.account.titleId && vm.account.lastName && vm.account.firstName && vm.pw == vm.cpw) {
                vm.isValid = true;
                vm.message = null;
                vm.pwMess = null;
            }
            else {
                vm.isValid = false;
                vm.message = "Nhập đầy đủ các mục!";
                if (vm.pw && vm.cpw) {
                    if (vm.pw != vm.cpw) {
                        vm.pwMess = 'Password không giống';
                    }
                    if (vm.pw == vm.cpw) {
                        vm.pwMess = null;
                    }
                }

                return;
            }
            console.log(vm)
        };

        function togglePassword() {
            debugger;
            console(vm.isShow)
        };

        function saveAccount(account) {

            if (account.id) {
                vm.accounts.forEach(function (item, index) {
                    if (account.id == item.id) {
                        item.lastName = account.lastName;
                        item.firstName = account.firstName;
                        item.titleId = account.titleId;
                        item.userName = relative.userName;
                        item.email = relative.email;
                    }
                    
                });
            }
            else if (!account.id) {
                vm.accounts.push(account);
                $scope.account = null;
                $scope.employeeObject = null;
            }
        }


        function editAccount(account) {
            vm.pw = null;
            vm.cpw = null;
            vm.message = null;
            vm.isValid = true;
            vm.account = {
                id: account.id,
                lastName: account.lastName,
                firstName: account.firstName,
                email: account.email,
                userName: account.userName,
                createdDate: account.createdDate,
                createdBy: account.createdBy,
                updatedDate: account.updatedDate,
                updatedBy: account.updatedBy,
                titleId: account.titleId,
                departmentId: account.departmentId,
            };

        };
    }
})();