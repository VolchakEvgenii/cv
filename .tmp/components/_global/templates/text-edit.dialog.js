angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/_global/templates/text-edit.dialog.html',
    '<md-dialog class="user-edit-dialog dialog"><md-dialog-content><textarea data-ui-tinymce="data-ui-tinymce" data-ng-model="vm.tinymceModel"></textarea></md-dialog-content><md-dialog-actions class="layout-row layout-align-center-center"><md-button ng-click="vm.dialogSave()" class="flex-xs-33">Save</md-button></md-dialog-actions></md-dialog>');
}]);
