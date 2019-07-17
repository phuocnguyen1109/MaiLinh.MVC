(function () {
    'use strict'
    angular.module('mainApp')
        .controller('equipmentController', equipmentController);

    function equipmentController($scope, $state) {
        var vm = this;
        vm.equipments = [
            { id: 1, name: "Dù", isProvide: false, date: "1/1/2019" },
            { id: 2, name: "TÚI XÁCH", isProvide: false, date: "1/1/2019" },
            { id: 3, name: "BÌA TRÌNH KÝ", isProvide: false, date: "1/1/2019" },
            { id: 4, name: "SIM ĐIỆN THOẠI", isProvide: false, date: "1/1/2019" },
        ]
        console.log("vm", vm)

    }
})();