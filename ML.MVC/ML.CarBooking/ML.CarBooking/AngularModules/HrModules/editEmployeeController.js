(function () {
    'use strict'
    angular.module('mainApp')
        .controller('editEmployeeController', editEmployeeController);

    editEmployeeController.$inject = ['$http', '$scope', '$state', '$stateParams'];
    function editEmployeeController($http, $scope, $state, $stateParams) {
        var vm = this;
        var personId = $stateParams.id;

        vm.saveChanges = saveChanges;

        vm.initialize = initialize;

        function initialize() {
            getMasterData();
            getPerson();
        }

        function saveChanges() {
            vm.person.IsPension = vm.person.IsPension == 'true' ? true : false;
            $http.post('/api/Person/UpdatePersonInformation', vm.person)
                .then(function (result) {
                    alert('Lưu Thông Tin Thành Công');
                });
        }

        function getPerson() {
            $http.get('/api/Person/GetPersonInformation', { params: { id: personId } })
                .then(function (result) {
                    if (result.data) {
                        vm.person = result.data;
                        vm.person.IsPension = vm.person.IsPension ? 'true' : 'false';
                        vm.person.DoB = new Date(vm.person.DoB);
                        vm.person.MLCDate = new Date(vm.person.MLCDate);
                        vm.person.StartDate = new Date(vm.person.StartDate);
                    }
                });
        }

        function getMasterData() {
            vm.placeOfBirth = [
                { id: 1, name: 'Hồ Chí Minh' },
                { id: 2, name: 'Hà Nội' }
            ];

            vm.religion = [
                { id: 1, name: 'Không' },
                { id: 2, name: 'Phật Giáo' },
                { id: 3, name: 'Thiên Chúa Giáo' },
                { id: 4, name: 'Hồi Giáo' }
            ];

            vm.countries = [
                { id: 0, name: '-- Chọn Quốc Tịch --' },
                { id: 1, name: 'Việt Nam' },
                { id: 2, name: 'Thái Lan' },
                { id: 3, name: 'Malaysia' }
            ];

            vm.nations = [
                { id: 0, name: '-- Chọn Dân Tộc --' },
                { id: 1, name: 'Kinh' },
                { id: 2, name: 'Ê - ĐÊ' },
                { id: 3, name: 'H` Mông' },
                { id: 4, name: 'Nùng' }
            ];

            vm.departments = [
                { id: 0, name: '-- Chọn Bộ Phận --' },
                { id: 1, name: 'Nhân Sự' },
                { id: 2, name: 'Kế Toán' },
                { id: 3, name: 'Kỹ Thuật - An Toàn' },
                { id: 4, name: 'Điều Hành' }
            ];

            vm.roles = [
                { id: 0, name: '-- Chọn Chức Vụ --' },
                { id: 2, name: 'Trưởng Phòng' },
                { id: 1, name: 'Phó Phòng' },
                { id: 3, name: 'Thư Ký' },
                { id: 4, name: 'Nhân Viên' }
            ];



        


        }


    }
})();