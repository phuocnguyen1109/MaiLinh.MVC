(function () {
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

        

        $scope.$parent.$watch('vm.person', function (values) {
            if (values && values.Id) {
                vm.personEdu.PersonLanguages = values.PersonLanguages;
                vm.personEdu.selectedDriveLicense = values.DriveLicenseId;
                vm.personEdu.Major = values.Major;
                vm.personEdu.GradeId = values.GradeId;
                vm.personEdu.DriveLicenseExpired = new Date(values.DriveLicenseExpired); 
                vm.personEdu.DriveLicensePlace = values.DriveLicensePlace;
                vm.personEdu.PersonWorkLicenses = buildWorkLincenseGrid(values.PersonWorkLicenses);

            }
        });
      


        function buildPersonLanguageGrid(data) {
                data.forEach(function (item, index) {
                    item.LanguageName = vm.languages.find(x => x.Id == item.LanguageId).Name;
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
            PubSub.subscribe('SAVE_PERSON', _savePerson);
        }

        function _savePerson() {
            PubSub.publish('education', vm.personEdu);
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
                    var createdPersonLanguage = angular.copy(vm.selectedPersonLanguage);
                    createdPersonLanguage.LanguageName = getLanguageName(createdPersonLanguage.LanguageId);
                    vm.personEdu.PersonLanguages.push(createdPersonLanguage);
                });
        }

        function getMLanguages() {
                $http.get('/api/Education/GetMLanguages')
                    .then(function (result) {
                        vm.languages = result.data;
                        vm.languages.splice(0, 0, { Id: 0, Name: '--Chọn Ngôn Ngữ--' });
                        if (vm.personEdu.PersonLanguages && vm.personEdu.PersonLanguages.length > 0) {
                            buildPersonLanguageGrid(vm.personEdu.PersonLanguages);
                        }
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
                    item.FromDate = new Date(selectedWL.FromDate);
                    item.ToDate = new Date(selectedWL.ToDate);
                }
            });
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
            debugger;
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
            console.log(vm.deletedDataRow);
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