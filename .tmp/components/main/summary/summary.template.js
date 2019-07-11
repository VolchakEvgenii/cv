angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/summary/summary.template.html',
    '<div class="summary-page"><div class="layout-row layout-align-center-center"><div ng-bind-html="vm.tinymceModel" class="flex-70"></div></div><div class="layout-row layout-align-center-center"><md-button aria-label="edit button" ng-click="vm.openTextEditDialog()" class="md-raised md-primary"><span class="md-padding">Edit</span><i aria-hidden="true" class="fas fa-edit"></i></md-button></div></div>');
}]);
