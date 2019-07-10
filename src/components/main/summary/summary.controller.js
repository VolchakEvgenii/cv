(function () {
    'use strict';

    angular
        .module('app.summary')
        .controller('SummaryController', SummaryController);

    SummaryController.$inject = ['$mdDialog', '$scope'];

    function SummaryController($mdDialog, $scope) {
        var vm = this;

        vm.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',

        };

        vm.tinymceModel = '<div class="page" title="Page 1">\n' +
            '<div class="section">\n' +
            '<div class="layoutArea">\n' +
            '<div class="column">\n' +
            '<p><span style="font-size: 10.000000pt;">Experience in new web features:<br /> Angular, Web Components, Material Design </span></p>\n' +
            '<p><span style="font-size: 10.000000pt;">3 years of web development<br /> Native JavaScript (EcmaScript 5.1), Twitter Bootstrap 3 (2), SASS (SCSS), Jade, HAML, LESS, jQuery, Angular Material, Google API, Javascript Animations </span></p>\n' +
            '<p><span style="font-size: 10.000000pt;">2+ years of mobile app development<br /> Ionic Framework, Cordova, Phonegap, Construct 2, Jquery-Mobile, Java </span></p>\n' +
            '<p><span style="font-size: 10.000000pt;">Additionally:<br /> Git, Github, Photoshop, REST, JSON, Gulp </span></p>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>';

        vm.openTextEditDialog = openTextEditDialog;
        vm.dialogSave = dialogSave;
        vm.dialogClose = dialogClose;

        function openTextEditDialog() {
            $mdDialog.show({
                scope: $scope,
                templateUrl: 'components/_global/templates/text-edit.dialog.html',
                preserveScope: true,
                bindToController: true,
                escapeToClose: true,
                fullscreen: true
            });
        }

        function dialogSave() {
            // TODO: make an api to save edited text
            vm.dialogClose();
        }

        function dialogClose() {
            $mdDialog.hide();
        }
    }
})();



