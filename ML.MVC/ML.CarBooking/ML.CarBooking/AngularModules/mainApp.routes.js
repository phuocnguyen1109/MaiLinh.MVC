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
                })
                //Vehicle 
                .state('vehicle', {
                    url: '/vehicle',
                    templateUrl: 'AngularModules/Vehicle/Templates/VehicleManagements.html',
                    controller: 'vehicleManagementController',
                    controllerAs: 'vm'
                })
                .state('editVehicle', {
                    url: '/vehicle/edit/:id',
                    templateUrl: 'AngularModules/Vehicle/Templates/EditVehicle.html',
                    controller: 'editVehicleController',
                    controllerAs: 'vm'
                })

                //Master Data
                //.state('masterData', {
                //    url: '/masterData',
                //    templateUrl: 'AngularModules/Administration/Templates/MasterDataManagements.html',
                //    controller: 'masterDataManagementController',
                //    controllerAs: 'vm'
                //})

                .state('nationalManagement', {
                    url: '/masterData/nationalManagement',
                    templateUrl: 'AngularModules/Administration/Templates/nationalManagement.html',
                    controller: 'nationalManagementController',
                    controllerAs: 'vm'
                })

                //Account
                .state('account', {
                    url: '/account',
                    templateUrl: 'AngularModules/Administration/Templates/AccountManagements.html',
                    controller: 'accountManagementController',
                    controllerAs: 'vm'
                })
        });
})();