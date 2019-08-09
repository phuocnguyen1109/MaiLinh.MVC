(function () {
    'use strict'
    angular.module('mainApp').component('nationalModalController', nationalModalController)

    function nationalModalController($scope, $uibModalInstance, items) {
        var vm = this;


        vm.citys = items;

        vm.selected = {
            item: vm.citys[0]
        };

        vm.ok = function () {
            $uibModalInstance.close(vm.selected.item);
        };

    };
})();