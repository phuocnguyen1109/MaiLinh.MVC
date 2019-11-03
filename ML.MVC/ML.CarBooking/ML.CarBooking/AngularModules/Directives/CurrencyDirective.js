angular.module('mainApp')
    .directive('mlCurrency', mlCurrency);
function mlCurrency() {
    return {
        restrict: 'EA',
        template: '<input type="text" name="Amount" class="form-control" ng-change="changeCurrencyValue()" ng-model="display" />',
        scope: {
            seperator: '@',
            value: '=',
        },
        controller: ['$scope', controller]
    };

    function controller($scope) {
        $scope.changeCurrencyValue = changeCurrencyValue;
        $scope.seperator = $scope.seperator || '.';
        function initialize() {
            $scope.display =  convertToCurrency($scope.value);
        }

        initialize();

        function changeCurrencyValue() {
            $scope.value = convertToInt($scope.display);
            $scope.display = convertToCurrency($scope.value);
        }

        function convertToCurrency(value) {
            if (!value) return 0;
            var strValue = value.toString();
            if (strValue.length <= 3) {
                return strValue;
            }
            var splitedValues = strValue.split('');
            var result = '';
            var numberFirst = strValue.length % 3;
            if (numberFirst > 0) {
                result += strValue.substr(0, numberFirst);
                result += $scope.seperator;
            }
            var countset = 1;
            for (var i = numberFirst; i < strValue.length; i++) {
                result += splitedValues[i];
                countset++;
                if (countset == 4 && i < strValue.length - 1) {
                    result += $scope.seperator;
                    countset = 1;
                }

            }

            return result;
        }

        function convertToInt(value) {
            if (value == NaN || value.trim() == '') return 0;
            var removeDots;
            for (var i = 0; i < value.toString().length; i++) {
                removeDots = value.toString().replace(/\./gi, '');
            }
            var result = parseInt(removeDots);
            return result;
        }
    }
}