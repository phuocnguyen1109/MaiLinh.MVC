(function () {
    'use strict'
    angular.module('mainApp')
        .controller('equipmentController', equipmentController);

    function equipmentController($scope, $state) {
        var vm = this;
        vm.equipments = [
            { id: 1, name: "Dù", isProvide: false, date: "" },
            { id: 2, name: "TÚI XÁCH", isProvide: false, date: "" },
            { id: 3, name: "BÌA TRÌNH KÝ", isProvide: false, date: "" },
            { id: 4, name: "SIM ĐIỆN THOẠI", isProvide: false, date: "" },
        ]
        console.log("vm", vm)

    }
})();