(function () {
    'use strict'
    angular.module('mainApp')
        .controller('marriageController', marriageController);

    function marriageController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;

        function initialize() {
            getMarritalStatus();
            getFamilyMembers()
        };


        function getMarritalStatus() {
            vm.marritalStatuss = [
                { marritalStatusId: 1, name: "Độc Thân" },
                { marritalStatusId: 2, name: "Lập Gia Đình" },
                { marritalStatusId: 3, name: "Đã Ly Dị" },
            ]
        };

        function getFamilyMembers() {
            vm.familyMembers = [
                { memberId: 1, memberName: "Nguyễn Văn Phi", dob: 1959, address: "TPHCM", relationship: "Bố", isGone: false },
                { memberId: 2, memberName: "Nguyễn Thị Nghi", dob: 1959, address: "TPHCM", relationship: "Mẹ", isGone: false },
            ]
        };

        console.log("vm", vm)

    }




})();