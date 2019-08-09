(function () {
    'use strict'
    angular.module('mainApp').controller('nationalManagementController', nationalManagementController);

    function nationalManagementController($scope, $state, $uibModal, $log, $document) {
        var vm = this;
        var selectedId;

        vm.initialize = initialize;
        vm.rowClick = rowClick;
        vm.checkSelected = checkSelected;
        vm.checkValid = checkValid;
        vm.filterNational = filterNational;
        vm.add = add;
        vm.addNewNational = addNewNational;
        vm.gotoEdit = gotoEdit;
        vm.saveChanges = saveChanges;
        vm.deleted = deleted;
        vm.deletedRow = deletedRow;

        var userId = $state.params.id;
        vm.selectedItem = 1;
        vm.selectedNational = 0;
        vm.listNewNational = [];
        vm.deleteRows = [];

        vm.isValid = false;
        vm.isBlank = true;

        function initialize() {
            //getNational();
            vm.types = [
                { Type: 0, TypeName: "Quốc Gia" },
                { Type: 1, TypeName: "Thành Phố" },
                { Type: 2, TypeName: "Quận, Huyện" }
            ]

            vm.nationals = [
                { ParentId: 0, ParentName: 'Việt Nam' },
                { ParentId: 1, ParentName: 'Thái Lan' },
                { ParentId: 2, ParentName: 'Malaysia' }
            ];

            vm.citys = [
                { IsSelected: false, Id: 5, Name: "Hồ Chí Minh", ParentId: 0, ParentName: "Việt Nam", Type: 1, TypeName: "Thành Phố" }
            ]
        }

        //function getNational() {
        //    //TO DO: get api here
        //    if (!userId) {
        //        return;
        //    }

        //}

        function filterNational() {

        }

        function rowClick(row) {
            if (row) {
                row.IsSelected = !row.IsSelected;
                checkSelected();
            }
        }

        function checkSelected() {
            //debugger;
            var selectedIds = angular.copy(vm.citys).filter(function (item) {
                return item.IsSelected;
            });


            if (selectedIds.length >= 1) {
                if (selectedIds.length == 1) {
                    selectedId = selectedIds[0].Id;
                    vm.CanEdit = true;
                } else {
                    vm.CanEdit = false;
                }
                vm.CanDelete = true;
                vm.deleteRows = selectedIds;
                console.log(vm.deleteRows);
                return;
            }

            vm.CanEdit = false;
            vm.CanDelete = false;
        }

        function resetModel() {
            vm.nationalModel = {
                Id: 0,
                Name: "",
                ParentId: null,
                Type: null
            };
        }

        function add() {
            vm.modalTitle = "Thêm mới";
            resetModel();
            vm.isValid = false;
        }

        function checkValid() {
            if (vm.nationalModel.Name != "" || !vm.nationalModel.Name) {
                vm.isValid = true;
                switch (vm.nationalModel.Type) {
                    case 0:
                        vm.isBlank = false;
                        vm.message = null;
                        break;
                    case 1:
                        if (vm.nationalModel.ParentId != null) {
                            vm.isBlank = false;
                            vm.message = null;
                        }
                        break;
                    case 2:
                        if (!vm.nationalModel.ParentId && !vm.nationalModel.Id) {
                            vm.isBlank = false;
                            vm.message = null;
                        }
                        break;
                    default:
                        break;
                }
                return;
            }
            vm.message = "Không để trống các mục!";
            vm.isBlank = true;
        }

        function addNewNational(row) {
            console.log(row);
            row.Id = new Date().getMilliseconds();
            vm.listNewNational.push(row);
            resetModel();
            vm.isBlank = false;
        }

        function gotoEdit() {
            resetModel();
            vm.modalTitle = "Chỉnh sửa";
            vm.citys.forEach(function (item) {
                if (item.IsSelected == true)
                    return vm.nationalModel = item;
            });

            console.log(vm.nationalModel);
            vm.isBlank = false;
        }

        function saveChanges() {
            if (!vm.isValid) {
                return;
            }
            vm.listNewNational.forEach(function (item) {
                var push = true;
                vm.citys.forEach(function (i) {
                    if (i.Id == item.Id) {
                        i.Name = item.Name;
                        vm.nationals.forEach(function (n) {
                            if (n.ParentId == item.ParentId) {
                                i.ParentId = n.ParentId;
                                i.ParentName = n.ParentName;
                                return;
                            }
                        });
                        vm.types.forEach(function (t) {
                            if (t.Type == item.Type) {
                                i.Type = t.Type;
                                i.TypeName = t.TypeName;
                                return;
                            }
                        });
                        push = false;
                    } else {
                        vm.nationals.forEach(function (n) {
                            if (n.ParentId == item.ParentId) {
                                item.ParentName = n.ParentName;
                                return;
                            }
                        });
                        vm.types.forEach(function (t) {
                            if (t.Type == item.Type) {
                                item.TypeName = t.TypeName;
                                return;
                            }
                        });
                    }
                });
                if (push) {
                    vm.citys.push(item);
                }
            });
            vm.listNewNational = [];
        }

        function deleted() {

            vm.deleteRows.forEach(function (row) {
                vm.citys.forEach(function (item, index) {
                    if (row.Id == item.Id) {
                        vm.citys.splice(index, 1);
                        return;
                    }
                });
            });
        }

        function deletedRow(row) {
            vm.listNewNational.forEach(function (i, index) {
                if (row.Id == i.Id) {
                    vm.listNewNational.splice(index, 1);
                    return;
                }
            })
        }
    }
})();