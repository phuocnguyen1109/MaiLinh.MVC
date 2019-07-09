(function () {
    'use strict';
    angular.module('mainApp')
        .controller('workingHistoriesController', workingHistoriesController);

    function workingHistoriesController($rootScope , $scope, $state) {
        var vm = this;
        vm.title = 'Chỉnh sửa lịch sử công tác';
        vm.workingHistories = [
            {
                fromDate: '01/01/2016',
                toDate: '12/12/2018',
                department: 'Công Ty TNHH MTV ABC'
            },
            {
                fromDate: '01/01/2019',
                toDate: '30/05/2019',
                department: 'Công Ty TNHH MTV DEF'
            }
        ];
        vm.openEditWorkHistory = openEditWorkHistory;
        // vm.addWorkHistory = addWorkHistory;
        
        vm.isEditing = true;
        function openEditWorkHistory(){
            
            
        }




        
    }

})();