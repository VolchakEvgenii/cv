(function () {
    'use strict';

    angular
        .module('app.experience', [])
        .config(experienceConfig);

    experienceConfig.$inject = [
        '$stateProvider'
    ];

    function experienceConfig($stateProvider) {
        $stateProvider
            .state('main.experience', {
                url: 'experience',
                views: {
                    'main': {
                        templateUrl: 'components/main/experience/experience.template.html',
                        controller: 'ExperienceController as vm'
                    }
                }
            });
    }
})();
