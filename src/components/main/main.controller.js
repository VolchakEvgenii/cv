'use strict';

(function () {
    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = [
        '$mdSidenav',
        'localStorageService',
        '$state'
    ];

    function MainController($mdSidenav, localStorageService, $state) {
        var vm = this,
            token = localStorageService.get('userToken');
        if (!token){
            $state.go('login');
        }

        vm.logout = logout;
        vm.toggleSidenav = toggleSidenav;

        function toggleSidenav(menuId) {
            $mdSidenav(menuId).toggle();
        }

        function logout() {
            localStorageService.clearAll();
            $state.go('login');
        }
    }
})();
