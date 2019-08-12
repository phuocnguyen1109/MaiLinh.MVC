(function () {
    'use strict'
    angular.module('mainApp').controller('employeeInfoController', employeeInfoController);

    employeeInfoController.$inject = ['$http', '$rootScope', '$scope', '$state'];
    function employeeInfoController($http, $rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        //vm.openCalendar = openCalendar;

        ////vm.person = $scope.$parent.person;
        //vm.dateOptions = {
        //    dateDisabled: disabled,
        //    formatYear: 'yy',
        //    maxDate: new Date(2020, 5, 22),
        //    minDate: new Date(),
        //    startingDay: 1
        //};
        //vm.isOpen = false;
        //vm.altInputFormats = ['M!/d!/yyyy'];

        function initialize() {
            
        }

        //// Disable weekend selection
        //function disabled(data) {
        //    var date = data.date,
        //        mode = data.mode;
        //    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        //}

        //function openCalendar() {
        //    vm.isOpen = !vm.isOpen;
        //};

    };
})();