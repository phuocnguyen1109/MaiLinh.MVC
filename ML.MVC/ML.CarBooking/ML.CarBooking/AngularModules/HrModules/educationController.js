(function () {
    'use strict'
    angular.module('mainApp').controller('educationController', educationController);

    function educationController($rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.add = add;


        vm.isValid = false;
        vm.isSelected = false;


        function initialize() {
            vm.userLanguage = { id: null, name: null, qualification: null };
            getLanguageCertifications();
            getLicenses();
            getListLanguages();
            getListQualifications();
        }

        function getLanguageCertifications() {
            //TODO: get data by api
            vm.languagesCertifications = [
                { id: "1", name: "Tiếng Anh", qualification : "Khá" },
                { id: "2", name: "Tiếng Hàn", qualification: "Khá" },
                { id: "3", name: "Tiếng Trung", qualification: "Trung bình" },
            ];
            console.log(vm.languagesCertifications);
        }

        function getLicenses() {
            //TODO: get data by api
            vm.lincenses = [
                { id: "1", name: "An toàn vệ sinh lao động", usedTime: null, licenseDate: null, expiredDate: null },
                { id: "2", name: "Sơ cấp cứu", usedTime: null, licenseDate: null, expiredDate: null },
                { id: "3", name: "Giấy chứng nhận tập huấn nghiệp vụ", usedTime: null, licenseDate: null, expiredDate: null },
                { id: "4", name: "Giấy chứng nhận nhân viên phục vụ hành khác", usedTime: null, licenseDate: null, expiredDate: null },
                { id: "5", name: "Giấy chứng nhận lái xe phòng thủ", usedTime: null, licenseDate: null, expiredDate: null },
                { id: "6", name: "Giấy xác nhận huấn luyện an toàn nội bộ", usedTime: null, licenseDate: null, expiredDate: null },
            ];
        }

        function getListLanguages() {
            vm.listLanguages = [
                { id: "1", name: "Tiếng Anh" }, { id: "2", name: "Tiếng Hàn" },
                { id: "3", name: "Tiếng Trung" }, { id: "4", name: "Tiếng Đức" },
                { id: "5", name: "Tiếng Nga" }, { id: "6", name: "Tiếng Tây Ban Nha" },
                { id: "7", name: "Tiếng Nhật" }, { id: "8", name: "Tiếng Ý" },
            ];
        }

        function getListQualifications() {
            vm.listQualifications = [
                { id: "1", qualification: "Giỏi" },
                { id: "2", qualification: "Khá" },
                { id: "3", qualification: "Trung bình" },
                { id: "4", qualification: "Yếu" },
            ];
        }

        function add() {
            vm.userLanguage = { id: null, name: null, qualification: null };
            vm.selectedLanguage = null;
            vm.selectedQualification = null;
            vm.modalTitle = "Thêm mới ngoại ngữ";
        }

        vm.saveChanges = function saveChanges() {
            //var nId = new Date();
            //nId = nId.getMilliseconds().toString();
            //vm.userLanguage.id = nId;
            vm.languagesCertifications.push(vm.userLanguage);
            console.log(vm.languagesCertifications);

        }

        vm.changeLang = function (value) {
            if (value != null) {
                vm.userLanguage.name = vm.listLanguages[value - 1].name;
                vm.userLanguage.id = vm.listLanguages[value - 1].id;
            }
        }
        vm.changeQuali = function (value) {
            console.log(value);
            if (value != null) {
                vm.userLanguage.qualification = vm.listQualifications[value-1].qualification;
            }
        }

        function checkValid() {
            console.log(vm.userLanguage);
            if (vm.userLanguage.name == null || vm.userLanguage.qualification == null) {
                vm.message = "Nhập đầy đủ các mục!";
                return;
            }
            vm.message = null;
            vm.isValid = true;
        }

        vm.editLanguage = function editLanguage(l) {
            console.log(l);
            vm.modalTitle = "Chỉnh sửa ngoại ngữ";
            vm.isValid = true;

            vm.selectedLanguage = l.id;
            vm.selectedQualification = l.id;
        }
    }

})();