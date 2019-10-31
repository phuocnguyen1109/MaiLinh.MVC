(function () {
    'use strict'
    angular.module('mainApp')
        .factory('Utilities', utilities);

    function utilities() {

        function convertToCurrency(value) {
            var strValue = value.toString();
            if (strValue.length <= 3) {
                return strValue;
            }
            var splitedValues = strValue.split('');
            var result='';
            var numberFirst = strValue.length % 3;
            //10000
            if (numberFirst > 0) {
                result += strValue.substr(0, numberFirst);
                result += '.';
            }
            var countset = 1;
            for (var i = numberFirst; i < strValue.length; i++) {
                result += splitedValues[i];
                countset++;
                if (countset == 4 && i < strValue.length-1) {
                    result += '.';
                    countset = 1;
                }
                
            }

            return result;
        }

        function convertToInt(value) {
            if (value == NaN) return 0;
            var removeDots;
            for (var i = 0; i < value.toString().length; i++) {
                removeDots = value.toString().replace('.', '');
            }
            var result = parseInt(removeDots);
            return result;
        }

        return {
            convertToCurrency: convertToCurrency,
            convertToInt: convertToInt
        };
        
    }
})();