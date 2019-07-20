(function () {
    'use strict'
    angular.module('mainApp')
        .controller('marriageController', marriageController);

    function marriageController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.changeRelationshipName = changeRelationshipName;
        vm.changeMarriageStatus = changeMarriageStatus;
        vm.gender = "male";
        vm.addNewRelative = addNewRelative;
        vm.checkValid = checkValid;
        vm.isValid = false;
        vm.saveNewRelative = saveNewRelative;
        vm.editRelative = editRelative;
        vm.deleteRelative = deleteRelative;

        function initialize() {
            getMarritalStatus();
            getRelatives();
            getRelationship();

        };

        function getMarritalStatus() {
            vm.marritalStatuss = [
                { marritalStatusId: 1, marritalStatusName: "Độc Thân" },
                { marritalStatusId: 2, marritalStatusName: "Lập Gia Đình" },
                { marritalStatusId: 3, marritalStatusName: "Đã Ly Dị" },
            ]
        };

        function getRelatives() {
            vm.relatives = [
                { relativeId: 1, relativeName: "Nguyễn Văn Phi", dob: 1959, address: "TPHCM", relationship: "Bố", isGone: false },
                { relativeId: 2, relativeName: "Nguyễn Thị Nghi", dob: 1959, address: "TPHCM", relationship: "Mẹ", isGone: false },
            ]
        };

        function getRelationship() {
            vm.relationship = [
                { relationshipId: 1, relationshipName: "Vợ / Chồng" },
                { relationshipId: 2, relationshipName: "Bố" },
                { relationshipId: 3, relationshipName: "Mẹ" },
                { relationshipId: 4, relationshipName: "Bố Vợ" },
                { relationshipId: 5, relationshipName: "Mẹ Vợ" },
                { relationshipId: 6, relationshipName: "Bố Chồng" },
                { relationshipId: 7, relationshipName: "Mẹ Chồng" },
            ]          
        };

        function changeRelationshipName(s) {
            vm.selectedRN = s;
            console.log(vm.selectedRN)
        };

        function changeMarriageStatus(s) {
            vm.selectedMS = s;
            console.log(vm.selectedMS)
        };

        function addNewRelative() {
            vm.isValid = false;
            vm.relative = { relativeId: null, relativeName: null, dob: null, address: null, relationship: null, isGone: false };
            console.log(vm.relative);
        };

        function checkValid() {
            if (vm.relative.relativeName && vm.relative.dob && vm.relative.address && vm.selectedRN) {
                vm.isValid = true;
                vm.message = null;
            }
            else {
                vm.isValid = false;
                vm.message = "Nhập đầy đủ các mục!";
                return;
            }
        };

        function saveNewRelative(relative) {
            relative.relationship = vm.selectedRN;
            relative.dob = new Date(relative.dob);
            vm.relatives.push(relative);
            $scope.relative = null;
        };

        function editRelative(relative) {
            vm.isValid = true;
            var dob = new Date(relative.dob)
            vm.relative = { relativeId: null, relativeName: relative.relativeName, dob: dob, address: relative.address, relationship: relative.relationship, isGone: relative.isGone };
        };

        function deleteRelative(relative) {
            console.log(relative)
        };

    }




})();