(function () {
    'use strict'
    angular.module('mainApp').controller('educationController', educationController);

    function educationController($rootScope, $scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAdd = openAdd;
        vm.openEditLanguage = openEditLanguage;
        vm.saveChanges = saveChanges;
        vm.saveLincense = saveLincense;
        vm.openDelModal = openDelModal;
        vm.deleted = deleted;

        vm.changeLang = changeLang;
        vm.changeQuali = changeQuali;
        vm.changeTime = changeTime;
        //vm.changeLicenseDate = changeLicenseDate;

        vm.isValid = false;
        vm.isSelected = false;
        vm.isEnable = false;
        vm.usedTime = null;
        vm.startDate = null;
        vm.expiredDate = null;

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
                { id: "1", name: "Tiếng Anh", qualification: "Khá" },
                { id: "2", name: "Tiếng Hàn", qualification: "Khá" },
                { id: "3", name: "Tiếng Trung", qualification: "Trung bình" },
            ];
            console.log("languagesCertifications => " + vm.languagesCertifications);
        }

        function getLicenses() {
            //TODO: get data by api
            vm.lincenses = [
                { id: "1", isCheck: false, isEnable: false, name: "An toàn vệ sinh lao động", usedTime: 0, licenseDate: null, expiredDate: null },
                { id: "2", isCheck: false, isEnable: false, name: "Sơ cấp cứu", usedTime: 0, licenseDate: null, expiredDate: null },
                { id: "3", isCheck: false, isEnable: false, name: "Giấy chứng nhận tập huấn nghiệp vụ", usedTime: 0, licenseDate: null, expiredDate: null },
                { id: "4", isCheck: false, isEnable: false, name: "Giấy chứng nhận nhân viên phục vụ hành khác", usedTime: 0, licenseDate: null, expiredDate: null },
                { id: "5", isCheck: false, isEnable: false, name: "Giấy chứng nhận lái xe phòng thủ", usedTime: 0, licenseDate: null, expiredDate: null },
                { id: "6", isCheck: false, isEnable: false, name: "Giấy xác nhận huấn luyện an toàn nội bộ", usedTime: 0, licenseDate: null, expiredDate: null },
            ];
        }

        function getListLanguages() {
            //TODO: get data by api
            vm.listLanguages = [
                { id: "1", name: "Tiếng Anh" }, { id: "2", name: "Tiếng Hàn" },
                { id: "3", name: "Tiếng Trung" }, { id: "4", name: "Tiếng Đức" },
                { id: "5", name: "Tiếng Nga" }, { id: "6", name: "Tiếng Tây Ban Nha" },
                { id: "7", name: "Tiếng Nhật" }, { id: "8", name: "Tiếng Ý" },
            ];
        }

        function getListQualifications() {
            //TODO: get data by api
            vm.listQualifications = [
                { id: "1", qualification: "Giỏi" },
                { id: "2", qualification: "Khá" },
                { id: "3", qualification: "Trung bình" },
                { id: "4", qualification: "Yếu" },
            ];
        }

        function openAdd() {
            vm.userLanguage = { id: null, name: null, qualification: null };
            vm.selectedLanguage = null;
            vm.selectedQualification = null;
            vm.modalTitle = "Thêm mới ngoại ngữ";
        }
        function openEditLanguage(l) {
            console.log(l);
            vm.modalTitle = "Chỉnh sửa ngoại ngữ";
            vm.message = null;
            vm.isValid = true;

            vm.selectedLanguage = l.id;
            vm.selectedQualification = l.id;
        }

        function saveChanges() {
            vm.languagesCertifications.push(vm.userLanguage);
            console.log(vm.languagesCertifications);

        }

        function changeLang(value) {
            if (value != null) {
                vm.userLanguage.name = vm.listLanguages[value - 1].name;
                vm.userLanguage.id = vm.listLanguages[value - 1].id;
                return;
            }
            vm.userLanguage.name = null;
            vm.userLanguage.id = null;
        }
        function changeQuali(value) {
            console.log(value);
            if (value != null) {
                vm.userLanguage.qualification = vm.listQualifications[value - 1].qualification;
                return;
            }
            vm.userLanguage.qualification = null;
        }
        function checkValid() {
            console.log(vm.userLanguage);
            if (vm.userLanguage.name == null || vm.userLanguage.qualification == null) {
                vm.message = "Nhập đầy đủ các mục!";
                vm.isValid = false;
                return;
            }
            vm.message = null;
            vm.isValid = true;
        }

        function changeTime(row) {
            //debugger;
            var expiredDate = null;
            if (row.licenseDate != null && row.usedTime != null) {
                var licenseDate = new Date(row.licenseDate);
                console.log(licenseDate);
                expiredDate = licenseDate.setMonth(licenseDate.getMonth() + row.usedTime);
                row.expiredDate = new Date(expiredDate);
                if (row.isCheck == true &&   row.usedTime != null && row.licenseDate != null && row.expiredDate != null) {
                    row.isEnable = true;
                    return;
                }
            }
            row.isEnable = false;
        }
        //function changeLicenseDate(row) {
        //    //debugger;
        //    var expiredDate = null;
        //    if (row.usedTime != null) {
        //        var licenseDate = new Date(row.licenseDate);
        //        expiredDate = licenseDate.setMonth(licenseDate.getMonth() + row.usedTime);
        //        row.expiredDate = new Date(expiredDate); 
        //        return;
        //    }
        //    alert("Không để trống thời gian sử dụng!");
        //}
        //function btnSaveCheckNotNull(row) {
        //    if (row.usedTime == null || row.licenseDate == null || row.expiredDate == null) {
        //        vm.isEnable = false;
        //        return;
        //    }
        //    vm.isEnable = true;
        //}

        
        function saveLincense(r) {
            var l = vm.lincenses.find(x => x.id == r.id);
            //l = r;
            console.log(vm.lincenses);
        }

        function openDelModal(r) {

        }

        function deleted() {
            console.log(row)
        }
    }

})();