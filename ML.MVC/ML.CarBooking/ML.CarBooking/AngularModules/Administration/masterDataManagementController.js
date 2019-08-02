(function () {
    'use strict'
    angular.module('mainApp')
        .controller('masterDataManagementController', masterDataManagementController);

    function masterDataManagementController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkSelected = checkSelected;
        vm.rowClick = rowClick;
        vm.editSystemDataType = editSystemDataType;
        vm.saveSystemDataType = saveSystemDataType;
        vm.isValid = false;
        vm.checkValid = checkValid;
        vm.openSystemDataType = openSystemDataType;

        var selectedId;

        function initialize() {

            resetsystemDataType();
            getsystemDataTypes();
        }

        function resetsystemDataType() {
            vm.tempSystemDataType = {
                id: 0,
                name: null,
                createdDate: null,
                createdBy: null,
                updatedDate: null,
                updatedBy: null,
                group: []
            };
        }

        function getsystemDataTypes() {
            vm.systemDataTypes = [
                {
                    id: 1,
                    name: "Lý lịch nhân sự",
                    createdDate: "1/1/1000",
                    createdBy: "Sam",
                    updatedDate: "2/1/1000",
                    updatedBy: "Sam",
                    group: [
                        { id: 1, name: "Tôn Giáo" },
                        { id: 2, name: "Dân Tộc" },
                        { id: 3, name: "Điện Thoại" },
                    ]


                },
                {
                    id: 2,
                    name: "GIấy Tờ /Bằng Cấp",
                    createdDate: "1/1/1000",
                    createdBy: "Sam",
                    updatedDate: "2/1/1000",
                    updatedBy: "Sam",
                    group: [
                        { id: 1, name: "Trình Độ Giáo Dục" },
                        { id: 2, name: "Giấy Phép Lái Xe" },
                        { id: 3, name: "Giấy Phép Hành Nghề" },
                        { id: 4, name: "Giấy Tờ Tùy Thân" },
                    ]
                },
                {
                    id: 3,
                    name: "Hợp Đồng/Bảo Hiểm",
                    createdDate: "1/1/1000",
                    createdBy: "Sam",
                    updatedDate: "2/1/1000",
                    updatedBy: "Sam",
                    group: [
                        { id: 1, name: "Tiêu Chuẩn Khám" },
                        { id: 2, name: "Thiết bị Theo Người" },
                    ]
                }
            ]

        }

        function rowClick(row) {
            if (row) {
                row.IsSelected = !row.IsSelected;
                checkSelected();
                vm.systemDataTypeSelected = row;
            }
        }

        function checkSelected() {
            var selectedIds = angular.copy(vm.systemDataTypes).filter(function (item) {
                return item.IsSelected;
            });

            if (selectedIds.length == 1) {
                selectedId = selectedIds[0].Id;
                vm.CanEdit = true;
                vm.CanDelete = true;
                return;
            }

            if (selectedIds.length > 1) {
                vm.CanDelete = true;
                vm.CanEdit = false;
                return;
            }

            vm.CanEdit = false;
            vm.CanDelete = false;
        }

        function editSystemDataType() {
            vm.tempSystemDataType = {
                id: vm.systemDataTypeSelected.id,
                name: vm.systemDataTypeSelected.name,
                createdDate: vm.systemDataTypeSelected.createdDate,
                createdBy: vm.systemDataTypeSelected.createdBy,
                updatedDate: vm.systemDataTypeSelected.updatedDate,
                updatedBy: vm.systemDataTypeSelected.updatedBy,
                group: vm.systemDataTypeSelected.group
            };

        };
        function openSystemDataType() {
            resetsystemDataType();
        };

        function saveSystemDataType(data) {
            if (data.id) {
                vm.systemDataTypes.forEach(function (item, index) {
                    if (item.id == data.id) {
                        item.id = data.id,
                        item.name = data.name                              
                    }
                });
            }
            else if (!data.id) {
                data.id +=1
                vm.systemDataTypes.push(data);
                $scope.tempSystemDataType = null;
            }
        }

        function checkValid() {
            if (vm.tempSystemDataType.name.length > 0) {
                vm.isValid = true;
                vm.message = null;
            }
            else {
                vm.isValid = false;
                vm.message = "Nhập đầy đủ các mục!";
                return;
            }
        };
    }
})();