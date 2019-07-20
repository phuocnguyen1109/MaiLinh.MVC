(function () {
    'use strict'
    angular.module('mainApp')
        .controller('marriageController', marriageController);

    function marriageController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.gender = "male";
        vm.addNewRelative = addNewRelative;
        vm.checkValid = checkValid;
        vm.isValid = false;
        vm.saveRelative = saveRelative;
        vm.editRelative = editRelative;
        vm.openDelModel = openDelModel;
        vm.deleterelative = deleterelative;

        vm.marriageStatusObject = { marritalStatusId: null, marritalStatusName: null };

        function initialize() {
            getMarritalStatuss();
            getRelatives();
            getRelationships();

            vm.relationships.forEach(function (rs, index) {
                vm.relatives.forEach(function (r) {
                    if (r.relationshipId == rs.relationshipId) {
                        r.relationshipName = rs.relationshipName;
                    }
                });
            });

        };

        function getMarritalStatuss() {
            vm.marritalStatuss = [
                { marritalStatusId: 1, marritalStatusName: "Độc Thân" },
                { marritalStatusId: 2, marritalStatusName: "Lập Gia Đình" },
                { marritalStatusId: 3, marritalStatusName: "Đã Ly Dị" },
            ]
        };

        function getRelatives() {
            vm.relatives = [
                { relativeId: 1, relativeName: "Nguyễn Văn Phi", dob: "1999", address: "TPHCM", relationshipId: 2, isGone: false },
                { relativeId: 2, relativeName: "Nguyễn Thị Nghi", dob: "1999", address: "TPHCM", relationshipId: 3, isGone: false },
            ]
        };

        function getRelationships() {
            vm.relationships = [
                { relationshipId: 1, relationshipName: "Vợ / Chồng" },
                { relationshipId: 2, relationshipName: "Bố" },
                { relationshipId: 3, relationshipName: "Mẹ" },
                { relationshipId: 4, relationshipName: "Bố Vợ" },
                { relationshipId: 5, relationshipName: "Mẹ Vợ" },
                { relationshipId: 6, relationshipName: "Bố Chồng" },
                { relationshipId: 7, relationshipName: "Mẹ Chồng" },
            ]
        };

        function addNewRelative() {
            vm.isValid = false;
            vm.relative = { relativeId: null, relativeName: null, dob: null, address: null, relationshipId: null, relationshipName: null, isGone: false };
        };

        function checkValid() {
            if (vm.relative.relativeName && vm.relative.dob && vm.relative.address && vm.relative.relationshipId) {
                vm.isValid = true;
                vm.message = null;
            }
            else {
                vm.isValid = false;
                vm.message = "Nhập đầy đủ các mục!";
                return;
            }

        };

        function saveRelative(relative) {

            if (relative.relativeId) {
                vm.relatives.forEach(function (item, index) {
                    if (relative.relativeId == item.relativeId) {
                        item.relativeName = relative.relativeName;
                        item.dob =relative.dob.getDate() + '/' + (relative.dob.getMonth()+1) + '/' + relative.dob.getFullYear();
                        item.relationshipId = relative.relationshipId;
                        item.isGone = relative.isGone;
                        item.address = relative.address;
                    }
                    vm.relationships.forEach(function (i, index) {
                        if (item.relationshipId == i.relationshipId) {
                            item.relationshipName = i.relationshipName;
                        }
                    });
                });
            }

            else if (!relative.relativeId) {
                relative.dob = relative.dob.getDate() + '/' + (relative.dob.getMonth() + 1) + '/' + relative.dob.getFullYear();
                vm.relatives.push(relative);
                $scope.relative = null;
                vm.relationships.forEach(function (i, index) {
                    if (relative.relationshipId == i.relationshipId) {
                        relative.relationshipName = i.relationshipName;
                    }
                });
            }

            console.log(relative)
            console.log(vm.relatives)

        };

        function editRelative(relative) {
            vm.isValid = true;
            var dob = new Date(relative.dob)
            vm.relative = {
                relativeId: relative.relativeId,
                relativeName: relative.relativeName,
                dob: dob,
                address: relative.address,
                relationshipId: relative.relationshipId,
                relationshipName: relative.relationshipName,
                isGone: relative.isGone
            };

        };

        function openDelModel(relative) {
            vm.relativeDel = relative;

        };

        function deleterelative(r) {
            vm.relatives.forEach(function (item, index) {
                if (r.relativeId == item.relativeId) {
                    vm.relativeDel.index = index;
                }
            });
            vm.relatives.splice(vm.relativeDel.index, 1)
            
        };




    }




})();