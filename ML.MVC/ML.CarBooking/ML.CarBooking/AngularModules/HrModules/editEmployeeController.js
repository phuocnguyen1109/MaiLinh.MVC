(function () {
    'use strict';
    angular.module('mainApp')
        .controller('editEmployeeController', editEmployeeController);

    function editEmployeeController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.save = save;
        function initialize(){

        }
        

        function save (){
            
        }
    }
})();