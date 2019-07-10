(function () {
    'use strict';

    angular
        .module('app.experience')
        .controller('ExperienceController', ExperienceController);

    ExperienceController.$inject = [
        'apiService',
        '$mdDialog',
        '$scope'
    ];

    function ExperienceController(apiService, $mdDialog, $scope) {
        var vm = this;
        vm.experienceData = [];
        vm.expElem = {};
        vm.form =  {
            title: '',
            dateRange: '',
            icon: '',
            technologies: '',
            description: '',
            link: ''
        };
        vm.remove = remove;
        vm.openEditDialog = openEditDialog;
        vm.dialogSave = dialogSave;
        vm.dialogClose = dialogClose;

        apiService.experienceGET().then(function (res) {
            vm.experienceData = res.data.data;
        });


        function dialogSave() {
            if(!vm.expElem.hasOwnProperty('id')) {
                vm.experienceData.push(vm.expElem);
            }
            // TODO: make an api to edit element
            vm.dialogClose();
        }

        function remove(i) {
            vm.experienceData.splice(i, 1);
        }

        function openEditDialog(elem) {
            vm.expElem = elem;
            $mdDialog.show({
                scope: $scope,
                templateUrl: 'components/_global/templates/card-edit.dialog.html',
                preserveScope: true,
                bindToController: true,
                escapeToClose: true
            });
        }

        function dialogClose() {
            $mdDialog.hide();
        }
    }
})();



