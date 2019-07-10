'use strict';

(function () {
    angular
        .module('app', [
            'app.config',
            'app.login',
            'app.main',
            'app.experience',
            'app.summary',
            'app.languages'
        ])
        .run(bootstrap);

    bootstrap.$inject = [
        '$location'
    ];

    function bootstrap($location) {
        // var token = localStorageService.get('userToken');
        // if (token) {
        //     $state.go('main.summary');
        // } else {
        //     $state.go('login');
        // }
        $location.path('/summary');
    }
})();
