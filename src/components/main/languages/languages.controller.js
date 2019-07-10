(function () {
    'use strict';

    angular
        .module('app.languages')
        .controller('LanguagesController', LanguagesController);

    LanguagesController.$inject = ['apiService'];

    function LanguagesController(apiService) {
        var vm = this;
        vm.myLangData = [];
        vm.codeLangData = [];
        vm.newLang = {};
        vm.levels = ['Native', 'Beginner', 'Pre-Intermediate', 'Intermediate', 'Upper-Intermediate', 'Advanced', 'Proficiency'];
        vm.add = add;

        apiService.myLangGET().then(function (res) {
            vm.myLangData = res.data.data;
        });

        apiService.langCodeGET().then(function (res) {
            vm.codeLangData = res.data.data;
        });

        function add() {
            if (vm.newLang.hasOwnProperty('name')) {
                vm.myLangData.push(vm.newLang);
                vm.newLang = {};
            }
        }
    }
})();



