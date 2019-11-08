﻿(function () {
    'use strict'
    angular.module('mainApp').controller('educationController', educationController);

    educationController.$inject = ['$http', '$rootScope', '$scope', '$state', '$stateParams','PubSub'];
    function educationController($http, $rootScope, $scope, $state, $stateParams, PubSub) {
        var vm = this;
        
        vm.isValidPersonlanguage = isValidPersonlanguage;
        vm.savePersonLanguage = savePersonLanguage;
        vm.initialize = initialize;
        vm.checkValid = checkValid;
        vm.openAdd = openAdd;
        vm.openEditLanguage = openEditLanguage;
        vm.saveLincense = saveLincense;
        vm.openDelModal = openDelModal;
        vm.deleted = deleted;
        vm.changeTime = changeTime;
        vm.dataChanges = dataChanges;
        vm.driveLicenseExpiredChange = driveLicenseExpiredChange;
        

        vm.isValidPLanguage = false;
        vm.isValid = false;
        vm.isSelected = false;
        vm.isEnable = false;
        vm.usedTime = null;
        vm.startDate = null;
        vm.expiredDate = null;

        vm.selectedDriveLicense = 0;
        vm.selectedEducationGrade = 0;
        vm.personEdu = {
            selectedDriveLicense: 0,
            GradeId: 0
        };
        var personId = $stateParams.id;

        var _initPersonInfo = null;
      
        function driveLicenseExpiredChange(value) {
            vm.personEdu.DriveLicenseExpired = value;
            dataChanges();
        }

        function buildPersonLanguageGrid(data) {
                data.forEach(function (item, index) {
                    item.LanguageName = vm.languages.find(x => x.Id == item.LanguageId).Name;
                });
            }

        function getPersonLanguages() {
            $http.get('/api/Education/GetPersonLanguages', { params: { pid: personId } })
                .then(response => {
                    vm.personEdu.PersonLanguages = response.data;
                    buildPersonLanguageGrid(vm.personEdu.PersonLanguages);
                });
        }

        function resetModel() {
            vm.selectedPersonLanguage = { Id: 0, PersonId: personId, LanguageId: 0, Level: '' };
        }

        function initialize() {
            resetModel();
            getMLanguages();
            vm.userLanguage = { id: null, name: null, qualification: null };
            getDriveLicenses();
            getEducationGrades();
            getListQualifications();
            PubSub.subscribe('PERSON_LOAD', _initPersonInfo);
        }

        _initPersonInfo = function (data) {
            vm.personEdu.selectedDriveLicense = data.DriveLicenseId;
            vm.personEdu.Major = data.Major;
            vm.personEdu.GradeId = data.GradeId;
            vm.personEdu.DriveLicenseExpired = data.DriveLicenseExpired;
            vm.personEdu.DriveLicensePlace = data.DriveLicensePlace;
            vm.personEdu.PersonWorkLicenses = buildWorkLincenseGrid(data.PersonWorkLicenses);
            console.log(vm.personEdu);
        }

        

        function dataChanges() {
            PubSub.publish('PERSON_EDU_CHANGED', vm.personEdu);
        }

        function getEducationGrades() {
            vm.educationGrades = E.EducationGrades;
            vm.educationGrades.splice(0, 0, { Id: 0, Name: '-- Chọn Trình Độ Học Vấn --' });
        }

        function getDriveLicenses() {
            vm.driveLicenses = E.DriveLicenses;
            vm.driveLicenses.splice(0, 0, { Id: 0, Name: '--Chọn Giấy Phép Lái Xe' });
        }

        function savePersonLanguage() {
            if (!vm.isValidPLanguage) {
                return;
            }
            $http.post('/api/Education/SavePersonLanguage', vm.selectedPersonLanguage)
                .then(function (result) {
                    if (result.data <= 0) { return; }
                    if (vm.selectedPersonLanguage.Id == 0) {
                        var createdPersonLanguage = angular.copy(vm.selectedPersonLanguage);
                        createdPersonLanguage.LanguageName = getLanguageName(createdPersonLanguage.LanguageId);
                        vm.personEdu.PersonLanguages.push(createdPersonLanguage);
                    } else {
                        vm.personEdu.PersonLanguages.splice(vm.selectedPersonLanguage.Index, 1, vm.selectedPersonLanguage);
                    }
                    resetModel();
                });
        }

        function getMLanguages() {
                $http.get('/api/Education/GetMLanguages')
                    .then(function (result) {
                        vm.languages = result.data;
                        vm.languages.splice(0, 0, { Id: 0, Name: '--Chọn Ngôn Ngữ--' });
                        getPersonLanguages();
                    });
        }
        function getLanguageName(id) {
            return vm.languages.find(x => x.Id == id).Name;
        }
        function getWorkLicenses() {
            vm.personWorkLicenses = [];
            var workLincenses = E.WorkLincenses;
            workLincenses.forEach(function (item, index) {
                vm.personWorkLicenses.push({ Id: item.Id, Name: item.Name, IsChecked: false, IsEnabled: false });
            });
        }

        function buildWorkLincenseGrid(personWorkLicenses) {
            if (!vm.personWorkLicenses) {
                getWorkLicenses();
            }
            vm.personWorkLicenses.forEach(function (item, index) {
                var selectedWL = personWorkLicenses.find(x => x.WorkLisenceId == item.Id);
                if (selectedWL) {
                    item.IsChecked = true;
                    item.IsEnabled = true;
                    item.Duration = selectedWL.Duration;
                    item.FromDate = selectedWL.FromDate;
                    item.ToDate = selectedWL.ToDate;
                }
            });
        }


        function getListQualifications() {
            vm.listQualifications = [
                { LevelId: '', Level:'--Chọn Trình Độ--'},
                { LevelId: "Giỏi", Level: "Giỏi" },
                { LevelId: "Khá", Level: "Khá" },
                { LevelId: "Trung bình", Level: "Trung bình" },
                { LevelId: "Yếu", Level: "Yếu" },
            ];
        }

        function isValidPersonlanguage() {
            vm.isValidPLanguage = vm.selectedPersonLanguage.LanguageId != 0 && vm.selectedPersonLanguage.Level != '';
        }

        function openAdd() {
            vm.userLanguage = { id: null, langId: null, name: null, qualityId: null, qualification: null };
            vm.selectedLanguage = null;
            vm.selectedQualification = null;
            vm.isEditing = false;
            vm.modalTitle = "Thêm mới ngoại ngữ";
        }

        function openEditLanguage(l, $index) {
            vm.modalTitle = "Chỉnh sửa ngoại ngữ";
            vm.message = null;
            vm.isValid = true;
            vm.isEditing = true;
            vm.selectedPersonLanguage = l;
            vm.selectedPersonLanguage.Index = $index;
        }



        function checkValid() {
            if (vm.userLanguage.langId == null || vm.userLanguage.qualityId == null) {
                vm.message = "Nhập đầy đủ các mục!";
                vm.isValid = false;
                return;
            }
            vm.message = null;
            vm.isValid = true;
        }

        function changeTime(row) {
            var ToDate = null;
            if (row.FromDate != null && row.Duration != null) {
                var FromDate = new Date(row.FromDate);
                ToDate = FromDate.setMonth(FromDate.getMonth() + row.Duration);
                row.ToDate = new Date(ToDate);
                if (row.IsChecked == true && row.Duration != null && row.FromDate != null && row.ToDate != null) {
                    row.IsEnabled = true;
                    return;
                }
            }
            row.IsEnabled = false;
        }
      


        function saveLincense(r) {
            var params = {
                PersonId: parseInt(personId),
                Duration: r.Duration,
                WorkLisenceId: parseInt(r.Id),
                FromDate: r.FromDate,
                ToDate: r.ToDate
            };
            $http.post('/api/Education/SaveWorkLicense', params)
                .then(function (result) {
                    debugger;
                });
        }

        function openDelModal(r) {
            vm.deletedDataRow = r;
        }

        function deleted(r) {
            $http.post('/api/Education/DeletePersonLanguage', { id: r.Id })
                .then(function (result) {
                    var deletedIndex;
                    vm.personEdu.PersonLanguages.forEach(function (item, index) {
                        if (r.Id == item.Id) {
                            deletedIndex = index;
                        }
                    });

                    vm.personEdu.PersonLanguages.splice(deletedIndex, 1);
                });
           
        }
    }

})();