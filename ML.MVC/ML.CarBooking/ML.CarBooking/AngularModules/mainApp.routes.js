(function () {
    'use strict'
    angular.module('mainApp')
        .config(function ($stateProvider, $urlRouterProvider) {
           // $urlRouterProvider.otherwise('/employees');
            $stateProvider
                .state('employees', {
                    url: '/employees',
                    templateUrl: 'AngularModules/HrModules/Templates/employees.html',
                    controller: 'employeesController',
                    controllerAs: 'vm'
                })
                .state('editEmployee', {
                    url: '/employee/edit/:id',
                    templateUrl: 'AngularModules/HrModules/Templates/editEmployee.html',
                    controller: 'editEmployeeController',
                    controllerAs: 'vm'
                });
        });
})();