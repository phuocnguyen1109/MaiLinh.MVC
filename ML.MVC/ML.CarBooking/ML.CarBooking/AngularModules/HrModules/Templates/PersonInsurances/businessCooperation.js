(function () {
    'use strict'
    angular.module('mainApp')
        .controller('businessCooperationController', businessCooperationController);

    businessCooperationController.$inject = ['$http', '$scope', '$state', '$stateParams', 'PubSub', 'Upload'];

    function businessCooperationController($http, $scope, $state, $stateParams, PubSub) {

    }
})();