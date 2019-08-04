(function () {
    'use strict'
    angular.module('mainApp')
        .controller('masterDataManagementController', masterDataManagementController);

    function masterDataManagementController($scope, $state) {
        var vm = this;
        vm.initialize = initialize;
        vm.checkSelected = checkSelected;
        vm.rowClick = rowClick;
        vm.editSystemData = editSystemData;
        vm.saveSystemData = saveSystemData;
        vm.isValid = false;
        vm.checkValid = checkValid;
        vm.openSystemData = openSystemData;
        vm.changeSysTemDataType = changeSysTemDataType;

        var selectedId;

        function initialize() {

            resetSystemDataType();
            getSystemDataTypes();
            resetSystemData();
            getData();
        }

        function resetSystemDataType() {
            vm.tempSystemDataType = {
                id: 0,
                name: null,
                group: null
            };

        }

        function resetSystemData(tempSystemDataTypeName) {

            vm.tempSystemData = {
                tempSystemDataId: 0,
                name: null,
                createdDate: null,
                createdBy: null,
                updatedDate: null,
                updatedBy: null,
                systemDataTypeName: tempSystemDataTypeName
            };

        }

        function getSystemDataTypes() {
            vm.systemDataTypes = [
                { id: 1, name: "Tôn Giáo", group: 'Lý Lịch Nhân Sự' },
                { id: 2, name: "Dân Tộc", group: 'Lý Lịch Nhân Sự' },
                { id: 3, name: "Điện Thoại", group: 'Lý Lịch Nhân Sự' },
                { id: 4, name: "Trình Độ Giáo Dục", group: 'GIấy Tờ /Bằng Cấp' },
                { id: 5, name: "Giấy Phép Lái Xe", group: 'GIấy Tờ /Bằng Cấp' },
                { id: 6, name: "Giấy Phép Hành Nghề", group: 'GIấy Tờ /Bằng Cấp' },
                { id: 7, name: "Giấy Tờ Tùy Thân", group: 'GIấy Tờ /Bằng Cấp' },
                { id: 8, name: "Tiêu Chuẩn Khám", group: 'Hợp Đồng/Bảo Hiểm' },
                { id: 9, name: "Thiết bị Theo Người", group: 'Hợp Đồng/Bảo Hiểm' },
            ]
        };

        function getData() {
            vm.systemDataTypes.forEach(function (item, index) {
                switch (item.id) {
                    case 1:
                        vm.systemDatas = [
                        {
                            systemDataId: 1,
                            name: "Phật Giáo",
                            createdDate: "1/1/2019",
                            createdBy: "Sam",
                            updatedDate: "1/1/2019",
                            updatedBy: "Sam",
                            systemDataTypeName: "Tôn Giáo"
                        },
                        {
                            systemDataId: 2,
                            name: "Thiên Chúa Giáo",
                            createdDate: "1/1/2019",
                            createdBy: "Sam",
                            updatedDate: "1/1/2019",
                            updatedBy: "Sam",
                            systemDataTypeName: "Tôn Giáo"
                        },
                    ]; break;
                    case 2: vm.systemDatas = [
                        {
                            systemDataId: 1,
                            name: "Kinh",
                            createdDate: "1/1/2019",
                            createdBy: "Sam",
                            updatedDate: "1/1/2019",
                            updatedBy: "Sam",
                            systemDataTypeName: "Dân Tộc"
                        },
                        {
                            systemDataId: 2,
                            name: "Mông",
                            createdDate: "1/1/2019",
                            createdBy: "Sam",
                            updatedDate: "1/1/2019",
                            updatedBy: "Sam",
                            systemDataTypeName: "Dân Tộc"
                        },
                    ]; break;
                }

            });
        }

        function rowClick(row) {
            if (row) {
                row.IsSelected = !row.IsSelected;
                checkSelected();
                vm.systemDataSelected = row;
            }
        }

        function checkSelected() {
            var selectedIds = angular.copy(vm.systemDatas).filter(function (item) {
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

        function editSystemData(tempSystemDataName) {
            vm.tempSystemData = {
                //id: vm.systemDataTypeSelected.id,
                name: tempSystemDataName,
                //createdDate: vm.systemDataTypeSelected.createdDate,
                //createdBy: vm.systemDataTypeSelected.createdBy,
                //updatedDate: vm.systemDataTypeSelected.updatedDate,
                //updatedBy: vm.systemDataTypeSelected.updatedBy,

            };

        };

        function openSystemData(systemDataTypeName) {
            resetSystemData(systemDataTypeName);
        };

        function saveSystemData(data) {
            if (data.systemDataId) {
                vm.systemData.forEach(function (item, index) {
                    if (item.systemDataId == data.systemDataId) {
                        item.systemDataId = data.systemDataId,
                        item.name = data.name                              
                    }
                });
            }
            else if (!data.id) {
                data.id +=1
                vm.systemDatas.push(data);
                $scope.tempSystemDataType = null;
            }
        }

        function checkValid() {
            if (vm.tempSystemData.name.length > 0) {
                vm.isValid = true;
                vm.message = null;
            }
            else {
                vm.isValid = false;
                vm.message = "Nhập tên hiển thị!";
                return;
            }
        };

        function changeSysTemDataType() {
            getData();
        }
    }
})();