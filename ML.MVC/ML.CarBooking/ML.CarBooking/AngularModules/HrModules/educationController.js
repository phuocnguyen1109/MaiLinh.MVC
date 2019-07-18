(function () {
    'use strict'
    angular.module('mainApp').controller('educationController', educationController);

    function educationController($rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.add = add;


        vm.isValid = false;


        function initialize() {
            vm.userLanguage = { id: null, name: null, qualification: null };
            getLanguageCertifications();
            getLicenses();
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
                { name: "Tiếng Anh" }, { name: "Tiếng Hàn" }, { name: "Tiếng Trung" }, { name: "Tiếng Đức" },
                { name: "Tiếng Nga" }, { name: "Tiếng Tây Ban Nha" }, { name: "Tiếng Nhật   " }, { name: "Tiếng Ý" },
            ];
        }

        function getListQualifications() {
            vm.listQualifications = [
                { qualification: "Giỏi" }, { qualification: "Khá" }, { qualification: "Trung bình" }, { qualification: "Yếu" },
            ];
        }

        function add() {
            getListLanguages();
            getListQualifications();
            vm.userLanguage = { id: null, name: null, qualification: null };
            vm.modalTitle = "Thêm mới ngoại ngữ";
        }

        vm.addLanguage = function addLanguage() {
            var nid = new Date();
            nid = nid.getMilliseconds();
            var newl = [
                { id: nid.toString(), name: selectedLanguage, qualification: selectedQualification }
            ];

            vm.languages.push(newl);
            console.log(vm.languages);
        }


        function checkValid() {
            console.log(vm.userLanguage);
            if (vm.userLanguage.name != "" && vm.userLanguage.qualification != "") {
                vm.message = null;
                vm.isValid = true;
            }
            vm.message = "Nhập đầy đủ các mục!";
            vm.isValid = false;
        }

        vm.editLanguage = function editLanguage(l) {
            vm.modalTitle = "Chỉnh sửa ngoại ngữ";
            vm.isValid = true;
            vm.userLanguage = {
                name: l.name, qualifications: l.qualifications
            };
        }
    }

})();