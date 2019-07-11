(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('apiService', apiService);
    apiService.$inject = ['Restangular', '$http'];

    function apiService(Restangular, $http) {
        return {
            api: Restangular.service('api'),

            experienceGET: function () {
                return $http.get('/cv/assets/json/experience.json');
            },

            myLangGET: function () {
                return $http.get('/cv/assets/json/my-lang.json');
            },

            langCodeGET: function () {
                return $http.get('/cv/assets/json/lang-code.json');
            }
        };
    }
})();
