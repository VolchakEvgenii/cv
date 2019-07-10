(function () {
    'use strict';

    angular
        .module('app.languages', [])
        .config(languagesConfig);

    languagesConfig.$inject = [
        '$stateProvider'
    ];

    function languagesConfig($stateProvider) {
        $stateProvider
            .state('main.languages', {
                url: 'languages',
                views: {
                    'main': {
                        templateUrl: 'components/main/languages/languages.template.html',
                        controller: 'LanguagesController as vm'
                    }
                }
            });
    }
})();
