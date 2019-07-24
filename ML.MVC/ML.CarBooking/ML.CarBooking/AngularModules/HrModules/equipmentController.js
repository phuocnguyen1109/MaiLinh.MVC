(function () {
    'use strict'
    angular.module('mainApp')
        .controller('equipmentController', equipmentController);

    function equipmentController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.save = save;

        function initialize() {
            var userId = "0001";
            getEquipments();
            getEquipmentsByUserId(userId);


            vm.equipments.forEach(function (item, index) {

                var userEquiments = vm.userEquipments.filter(function (value) {
                    return value.equipmentId == item.equipmentId;
                });

                if (userEquiments.length > 0) {
                    item.receivedDate = new Date(userEquiments[0].receivedDate);
                    item.isReceive = true;
                }
            });


        };


        function getEquipments() {
            vm.equipments = [
                { equipmentId: 1, name: "Dù" },
                { equipmentId: 2, name: "TÚI XÁCH" },
                { equipmentId: 3, name: "BÌA TRÌNH KÝ" },
                { equipmentId: 4, name: "SIM ĐIỆN THOẠI" },
            ]
        };

        function getEquipmentsByUserId(userId) {
            vm.userEquipments = [
                { id: 1, userId: "0001", equipmentId: 1, receivedDate: "1/1/2019" },
                { id: 2, userId: "0001", equipmentId: 2, receivedDate: "1/1/2019" },
                { id: 3, userId: "0001", equipmentId: 4, receivedDate: "3/1/2019" },

            ]
        };

        function save(row) {
            console.log(row)
        };

        console.log("vm", vm)

    }




})();