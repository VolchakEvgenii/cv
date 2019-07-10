(function () {
    'use strict';

    angular
        .module('app.summary', [])
        .config(summaryConfig);

    summaryConfig.$inject = [
        '$stateProvider'
    ];

    function summaryConfig($stateProvider) {
        $stateProvider
            .state('main.summary', {
                url: 'summary',
                views: {
                    'main': {
                        templateUrl: 'components/main/summary/summary.template.html',
                        controller: 'SummaryController as vm'
                    }
                }
            });
    }
})();
