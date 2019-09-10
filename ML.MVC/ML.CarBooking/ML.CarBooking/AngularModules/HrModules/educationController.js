(function () {
    'use strict'
    angular.module('mainApp').controller('educationController', educationController);

    educationController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams'];
    function educationController( $http, $rootScope, $scope, $state, $stateParams) {
        var vm = this;

        vm.isValidPersonlanguage = isValidPersonlanguage;
        vm.savePersonLanguage = savePersonLanguage;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAdd = openAdd;
        vm.openEditLanguage = openEditLanguage;
        vm.saveChanges = saveChanges;
        vm.saveLincense = saveLincense;
        vm.openDelModal = openDelModal;
        vm.deleted = deleted;
        vm.changeTime = changeTime;

        vm.isValidPLanguage = false;
        vm.isValid = false;
        vm.isSelected = false;
        vm.isEnable = false;
        vm.usedTime = null;
        vm.startDate = null;
        vm.expiredDate = null;
        var personId = $stateParams.id;

        function resetModel() {
            vm.personEducation = {
                languages :[]

            };

            vm.selectedPersonLanguage = { Id: 0, PersonId: personId, LanguageId: 0, Level: '' };
        }
        function initialize() {
            resetModel();
            getMLanguages();
            vm.userLanguage = { id: null, name: null, qualification: null };
            getLicenses();
            getListQualifications();
        }

        function getPersonEducations() {

        }

        function savePersonLanguage() {
            if (!vm.isValidPLanguage) {
                return;
            }
            $http.post('/api/Education/SavePersonLanguage', vm.selectedPersonLanguage)
                .then(function (result) {
                    var createdPersonLanguage = angular.copy(vm.selectedPersonLanguage);
                    createdPersonLanguage.LanguageName = getLanguageName(createdPersonLanguage.LanguageId);
                    vm.personEducation.languages.push(createdPersonLanguage);
                });
        }

        function getMLanguages() {
            $http.get('/api/Education/GetMLanguages')
                .then(function (result) {
                    vm.languages = result.data;
                    vm.languages.splice(0, 0, { Id: 0, Name: '--Chọn Ngôn Ngữ--' });
                });
        }

        function getLanguageName(id) {
            return vm.languages.find(x => x.Id == id).Name;
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

        //remove
        function getListLanguages() {
            ////TODO: get data by api
            //vm.listLanguages = [
            //    { id: 1, name: "Tiếng Anh" },
            //    { id: 2, name: "Tiếng Hàn" },
            //    { id: 3, name: "Tiếng Trung" },
            //    { id: 4, name: "Tiếng Đức" },
            //    { id: 5, name: "Tiếng Nga" },
            //    { id: 6, name: "Tiếng Tây Ban Nha" },
            //    { id: 7, name: "Tiếng Nhật" },
            //    { id: 8, name: "Tiếng Ý" },
            //];
        }

        function getListQualifications() {
            vm.listQualifications = [
                { id:'', qualification:'--Chọn Trình Độ--'},
                { id: "Giỏi", qualification: "Giỏi" },
                { id: "Khá", qualification: "Khá" },
                { id: "Trung bình", qualification: "Trung bình" },
                { id: "Yếu", qualification: "Yếu" },
            ];
        }

        function isValidPersonlanguage() {
            vm.isValidPLanguage = vm.selectedPersonLanguage.LanguageId != 0 && vm.selectedPersonLanguage.Level != '';
        }

        function openAdd() {
            vm.userLanguage = { id: null, langId: null, name: null, qualityId: null, qualification: null };
            vm.selectedLanguage = null;
            vm.selectedQualification = null;
            vm.modalTitle = "Thêm mới ngoại ngữ";
        }

        function openEditLanguage(l) {
            console.log(l);
            vm.modalTitle = "Chỉnh sửa ngoại ngữ";
            vm.message = null;
            vm.isValid = true;

            vm.userLanguage = l;
        }

        function saveChanges() {
            var r = vm.userLanguage;
            if (r.id) {
                vm.languagesCertifications.forEach(function (item, index) {
                    if (r.id == item.id) {
                        vm.listLanguages.forEach(function (lang, index) {
                            if (r.langId == lang.id) {
                                item.langId = lang.id;
                                item.name = lang.name;
                            }
                        });
                        vm.listQualifications.forEach(function (quality, index) {
                            if (r.qualityId == quality.id) {
                                item.qualityId = quality.id;
                                item.qualification = quality.qualification;
                            }
                        });
                        return r;
                    };
                });
            }
            else {
                var found = false;
                vm.languagesCertifications.forEach(function (item, index) {
                    if (r.langId == item.langId) {
                        alert("Không thể nhập ngôn ngữ đã có!");
                        found = true;
                        return;
                    }
                });
                if (!found) {

                    vm.message = null;
                    vm.userLanguage.id = r.langId;
                    vm.listLanguages.forEach(function (lang, index) {
                        if (r.langId == lang.id) {
                            vm.userLanguage.name = lang.name;
                            return;
                        }
                    });
                    vm.listQualifications.forEach(function (quality, index) {
                        if (r.qualityId == quality.id) {
                            vm.userLanguage.qualification = quality.qualification;
                            return;
                        }
                    });
                    vm.languagesCertifications.push(vm.userLanguage);

                }
            };

            console.log(vm.languagesCertifications);
        }


        function checkValid() {
            console.log(vm.userLanguage);
            if (vm.userLanguage.langId == null || vm.userLanguage.qualityId == null) {
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
                expiredDate = licenseDate.setMonth(licenseDate.getMonth() + row.usedTime);
                row.expiredDate = new Date(expiredDate);
                if (row.isCheck == true && row.usedTime != null && row.licenseDate != null && row.expiredDate != null) {
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
            vm.deletedDataRow = r;
            console.log(vm.deletedDataRow);
        }

        function deleted(r) {
            var deletedInndex = null;
            vm.languagesCertifications.forEach(function (item, index) {
                if (r.id == item.id) {
                    deletedInndex = index;
                }
            });
            vm.languagesCertifications.splice(deletedInndex, 1);
        }
    }

})();