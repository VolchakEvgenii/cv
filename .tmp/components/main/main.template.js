angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/main.template.html',
    '<md-sidenav md-component-id="mainLeft" class="main-sidenav md-whiteframe-z2"><md-list><md-list-item class="layout-row layout-align-start-center"><md-button aria-label="Configuration" ui-sref="main.summary" ui-sref-active="md-active" ng-click="vm.toggleSidenav(\'mainLeft\')" class="flex">Summary</md-button></md-list-item><md-list-item class="layout-row layout-align-start-center"><md-button aria-label="Configuration" ui-sref="main.experience" ui-sref-active="md-active" ng-click="vm.toggleSidenav(\'mainLeft\')" class="flex">Experience</md-button></md-list-item><md-list-item class="layout-row layout-align-start-center"><md-button aria-label="Configuration" ui-sref="main.languages" ui-sref-active="md-active" ng-click="vm.toggleSidenav(\'mainLeft\')" class="flex">Languages</md-button></md-list-item></md-list></md-sidenav><md-toolbar class="main-toolbar"><div class="md-toolbar-tools layout-row hide-gt-sm"><md-button aria-label="open menu" ng-click="vm.toggleSidenav(\'mainLeft\')" class="md-raised flex-20"><i aria-hidden="true" class="fa fa-bars"></i></md-button><div class="flex-60"></div><a ui-sref="main.summary" class="logo layout-row layout-align-center-center"><span>EV</span></a></div><div class="md-toolbar-tools flex-gt-sm-80 flex-offset-gt-sm-10 hide-sm hide-xs"><a ui-sref="main.summary" class="logo layout-row layout-align-center-center"><span>EV</span></a><md-nav-bar nav-bar-aria-label="navigation links" md-no-ink-bar="true" class="flex"><md-nav-item md-nav-sref="main.summary" name="summary" ui-sref-active="md-active">Summary</md-nav-item><md-nav-item md-nav-sref="main.experience" name="experience" ui-sref-active="md-active">Experience</md-nav-item><md-nav-item md-nav-sref="main.languages" name="languages" ui-sref-active="md-active">Languages</md-nav-item></md-nav-bar></div></md-toolbar><md-content class="main-content flex"><div ui-view="main" class="flex-gt-sm-80 flex-offset-gt-sm-10 md-padding"></div></md-content><footer class="main-footer"><div class="layout-row layout-align-space-around-center"><a aria-label="skype" href="skype:volchak_jeka?chat" class="social-btn"><i aria-hidden="true" class="fab fa-skype"></i><span class="hide-sm hide-xs">volchak_jeka</span></a><a aria-label="skype" href="https://t.me/EugeneVol" target="_blank" class="social-btn"><i aria-hidden="true" class="fab fa-telegram-plane"></i><span class="hide-sm hide-xs">EugeneVol</span></a><a aria-label="phone" href="tel:+380932251761" class="social-btn"><i aria-hidden="true" class="fas fa-phone"></i><span class="hide-sm hide-xs">+380932251761</span></a><a aria-label="email" href="mailto:evgeniy.volchak@gmail.com" class="social-btn"><i aria-hidden="true" class="fas fa-envelope"></i><span class="hide-sm hide-xs">evgeniy.volchak@gmail.com</span></a></div></footer>');
}]);
