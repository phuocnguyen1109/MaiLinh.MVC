angular.module('mainApp')
    .directive('datePicker', datePicker);
function datePicker() {
    var template = '<p class="input-group">';
    template +=' <input ng-disabled="disabled" type="text" placeholder="--/--/----" ng-change="changeValue()" class="form-control" uib-datepicker-popup="{{format}}" show-button-bar="false" ng-model="display" is-open="opened"  close-text="Close" />';
    template += '     <span class="input-group-btn">';
    template += '            <button ng-disabled="disabled" type="button" class="btn btn-outline-primary" ng-click="openModal()"><i class="fas fa-calendar"></i></button>';
    template += '        </span>';
    template += '    </p>';

    return {
        restrict: 'EA',
        template: template,
        scope: {
            format: '@',
            value: '=',
            disabled: '=',
            onChange: '&'
        },
        controller: ['$scope', controller]
    };

    function controller($scope) {

        $scope.$watch('$scope.disabled', function (newValue, oldValue) {
            $scope.disabled = newValue;
        });

        $scope.$watch('value', function (newValue, oldValue) {
            initialize();
        });

        function initialize() {
            if (!$scope.value) { $scope.display = null; return; } 
                $scope.display = new Date($scope.value);
            
        }
        initialize();

        $scope.changeValue = function (e) {
            var date = $scope.display;
            if (!date) { $scope.value = null; return; }
            $scope.value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);
            $scope.onChange({ value: $scope.value });
        };

        $scope.openModal = function () {
            $scope.opened = true;
        };

    }
}