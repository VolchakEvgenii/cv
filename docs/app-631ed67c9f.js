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




'use strict';

(function () {
    angular
        .module('app.main', [])
        .config(mainConfig);

    mainConfig.$inject = [
        '$stateProvider'
    ];

    function mainConfig($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                abstract: true,
                templateUrl: 'components/main/main.template.html',
                controller: 'MainController as vm'
            });
    }
})();

'use strict';

(function () {
    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = [
        '$mdSidenav',
        'localStorageService',
        '$state'
    ];

    function MainController($mdSidenav, localStorageService, $state) {
        var vm = this,
            token = localStorageService.get('userToken');
        if (!token){
            $state.go('login');
        }

        vm.logout = logout;
        vm.toggleSidenav = toggleSidenav;

        function toggleSidenav(menuId) {
            $mdSidenav(menuId).toggle();
        }

        function logout() {
            localStorageService.clearAll();
            $state.go('login');
        }
    }
})();

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




(function () {
    'use strict';

    angular
        .module('app.login', [])
        .config(loginConfig);

    loginConfig.$inject = [
        '$stateProvider'
    ];
    function loginConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.html',
                controller: 'LoginCtrl as vm'
            });
    }
})();

(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
        'loginService',
        'localStorageService',
        '$state'
    ];

    function LoginCtrl(loginService, localStorageService, $state) {
        var vm = this;

        vm.error ='';
        vm.login = login;

        function login() {
            loginService.login(vm.user).then(function (data) {
                if(data.token){
                    localStorageService.set('userToken', data.token);
                    $state.go('main.summary');
                } else if (data.error) {
                    vm.error = data.error;
                    vm.user = {};
                    vm.loginForm.$setPristine();
                    vm.loginForm.$setUntouched();
                    vm.loginForm.$submitted = false;
                }
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app', [
            'app.config',
            'app.login',
            'app.main',
            'app.experience',
            'app.summary',
            'app.languages'
        ])
        .run(bootstrap);

    bootstrap.$inject = [
        '$location'
    ];

    function bootstrap($location) {
        // var token = localStorageService.get('userToken');
        // if (token) {
        //     $state.go('main.summary');
        // } else {
        //     $state.go('login');
        // }
        $location.path('/summary');
    }
})();

'use strict';

(function () {
    angular
        .module('app.config', [
            'ngMaterial',
            'restangular',
            'ui.router',
            'LocalStorageModule',
            'ngMessages',
            'ui.tinymce',
            'ngSanitize'
        ])
        .config(appConfig)
        .constant('api', {
            url: 'https://reqres.in/'
        })
        .run(runAppConfig);

    appConfig.$inject = [
        '$mdThemingProvider',
        'localStorageServiceProvider',
        '$locationProvider'
    ];

    function appConfig($mdThemingProvider, localStorageServiceProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        localStorageServiceProvider.setPrefix('cv');

        $mdThemingProvider.definePalette('cv', {
            '50': 'f5fae9',
            '100': 'e7f2c7',
            '200': 'd7eaa2',
            '300': 'c6e27c',
            '400': 'badb60',
            '500': 'aed544',
            '600': 'a7d03e',
            '700': '9dca35',
            '800': '94c42d',
            '900': '84ba1f',
            'A100': 'fafff2',
            'A200': 'e7ffbf',
            'A400': 'd4ff8c',
            'A700': 'cbff73',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('cv')
            .accentPalette('brown');
    }

    function runAppConfig(Restangular, api) {
        Restangular.setBaseUrl(api.url);
    }
})();

'use strict';

(function () {
    angular
        .module('app.config')
        .factory('loginService', loginService);
    loginService.$inject = ['Restangular'];

    function loginService(Restangular) {
        return {
            api: Restangular.service('api'),
            login: function (options) {
                return this.api.one('login').customPOST(options).then(function (data) {
                    return data;
                }, function (error) {
                    return error.data;
                });
            }
        };
    }
})();

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

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/_global/_global.footer.html',
    '');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/_global/_global.header.html',
    '<head><meta charset="utf-8"><meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"><meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"><title>CV</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous"><script src="https://kit.fontawesome.com/bf6f317d24.js"></script><link rel="stylesheet" href="styles.css"></head>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/login/login.html',
    '<div class="login-wrapper layout-column layout-align-center-center"><div class="layout-column layout-align-center-center"><span>In this cv-test-app I used https://reqres.in/ service for login!</span><span>Just use this email "eve.holt@reqres.in" and password "cityslicka" for login.</span></div><md-card><md-card-title><md-card-title-text class="layout-align-center-center"><h4 class="md-title">Login</h4></md-card-title-text></md-card-title><md-card-content><form name="vm.loginForm" role="form" novalidate="" ng-submit="vm.login(user)" class="layout-column"><md-input-container ng-class="{ \'md-input-invalid\' : vm.loginForm.username.$invalid &amp;&amp; !vm.loginForm.username.$pristine }"><label>Email</label> <input type="email" required="" ng-model="vm.user.email" name="email" ng-minlength="10" ng-maxlength="100"><div ng-messages="vm.loginForm.email.$error" ng-if="vm.loginForm.email.$dirty || vm.loginForm.email.$touched" class="error-container"><div ng-message="required" class="error">Email field is required</div><div ng-message="email" class="error">The email you entered is not valid</div><div ng-message="minlength" class="error">Your email is too short.</div></div></md-input-container><md-input-container ng-class="{ \'md-input-invalid\' : vm.loginForm.password.$invalid &amp;&amp; !vm.loginForm.password.$pristine }"><label>Password</label> <input type="password" required="" ng-model="vm.user.password" name="password" ng-minlength="6" ng-maxlength="20"><div ng-messages="vm.loginForm.password.$error" ng-if="vm.loginForm.password.$dirty || vm.loginForm.password.$touched" class="error-container"><div ng-message="required" class="error">Password field is required</div><div ng-message="minlength" class="error">Your password must be between 6 and 20 characters long.</div><div ng-message="maxlength" class="error">Your password must be between 6 and 20 characters long.</div></div></md-input-container><label ng-if="vm.error &amp;&amp; !vm.loginForm.$dirty" class="error">{{vm.error}}</label><md-button type="submit" ng-disabled="!vm.loginForm.$valid" class="md-raised md-primary">Login</md-button></form></md-card-content></md-card></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/main.template.html',
    '<md-sidenav md-component-id="mainLeft" class="main-sidenav md-whiteframe-z2"><md-list><md-list-item class="layout-row layout-align-start-center"><md-button aria-label="Configuration" ui-sref="main.summary" ui-sref-active="md-active" ng-click="vm.toggleSidenav(\'mainLeft\')" class="flex">Summary</md-button></md-list-item><md-list-item class="layout-row layout-align-start-center"><md-button aria-label="Configuration" ui-sref="main.experience" ui-sref-active="md-active" ng-click="vm.toggleSidenav(\'mainLeft\')" class="flex">Experience</md-button></md-list-item><md-list-item class="layout-row layout-align-start-center"><md-button aria-label="Configuration" ui-sref="main.languages" ui-sref-active="md-active" ng-click="vm.toggleSidenav(\'mainLeft\')" class="flex">Languages</md-button></md-list-item></md-list></md-sidenav><md-toolbar class="main-toolbar"><div class="md-toolbar-tools layout-row hide-gt-sm"><md-button aria-label="open menu" ng-click="vm.toggleSidenav(\'mainLeft\')" class="md-raised flex-20"><i aria-hidden="true" class="fa fa-bars"></i></md-button><div class="flex-60"></div><a ui-sref="main.summary" class="logo layout-row layout-align-center-center"><span>EV</span></a></div><div class="md-toolbar-tools flex-gt-sm-80 flex-offset-gt-sm-10 hide-sm hide-xs"><a ui-sref="main.summary" class="logo layout-row layout-align-center-center"><span>EV</span></a><md-nav-bar nav-bar-aria-label="navigation links" md-no-ink-bar="true" class="flex"><md-nav-item md-nav-sref="main.summary" name="summary" ui-sref-active="md-active">Summary</md-nav-item><md-nav-item md-nav-sref="main.experience" name="experience" ui-sref-active="md-active">Experience</md-nav-item><md-nav-item md-nav-sref="main.languages" name="languages" ui-sref-active="md-active">Languages</md-nav-item></md-nav-bar></div></md-toolbar><md-content class="main-content flex"><div ui-view="main" class="flex-gt-sm-80 flex-offset-gt-sm-10 md-padding"></div></md-content><footer class="main-footer"><div class="layout-row layout-align-space-around-center"><a aria-label="skype" href="skype:volchak_jeka?chat" class="social-btn"><i aria-hidden="true" class="fab fa-skype"></i><span class="hide-sm hide-xs">volchak_jeka</span></a><a aria-label="skype" href="https://t.me/EugeneVol" target="_blank" class="social-btn"><i aria-hidden="true" class="fab fa-telegram-plane"></i><span class="hide-sm hide-xs">EugeneVol</span></a><a aria-label="phone" href="tel:+380932251761" class="social-btn"><i aria-hidden="true" class="fas fa-phone"></i><span class="hide-sm hide-xs">+380932251761</span></a><a aria-label="email" href="mailto:evgeniy.volchak@gmail.com" class="social-btn"><i aria-hidden="true" class="fas fa-envelope"></i><span class="hide-sm hide-xs">evgeniy.volchak@gmail.com</span></a></div></footer>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/_global/templates/card-edit.dialog.html',
    '<md-dialog aria-label="buy" class="user-edit-dialog dialog"><md-dialog-content><form name="vm.form" role="form" novalidate="" ng-submit="vm.dialogSave()" class="layout-column"><md-input-container ng-class="{ \'md-input-invalid\' : vm.form.title.$invalid &amp;&amp; !vm.form.title.$pristine }"><label>Title</label> <input type="text" required="" ng-model="vm.expElem.title" name="title"><div ng-messages="vm.form.title" ng-if="vm.form.title.$dirty || vm.form.title.$touched" class="error-container"><div ng-message="required" class="error">Title field is required</div></div></md-input-container><md-input-container ng-class="{ \'md-input-invalid\' : vm.form.dateRange.$invalid &amp;&amp; !vm.form.dateRange.$pristine }"><label>Date Range</label> <input type="text" required="" ng-model="vm.expElem.dateRange" name="icon"><div ng-messages="vm.form.dateRange" ng-if="vm.form.dateRange.$dirty || vm.form.dateRange.$touched" class="error-container"><div ng-message="required" class="error">Date Range field is required</div></div></md-input-container><md-input-container ng-class="{ \'md-input-invalid\' : vm.form.icon.$invalid &amp;&amp; !vm.form.icon.$pristine }"><label>Icon URL</label> <input type="text" ng-model="vm.expElem.icon" name="icon"></md-input-container><md-input-container ng-class="{ \'md-input-invalid\' : vm.form.link.$invalid &amp;&amp; !vm.form.link.$pristine }"><label>Link</label> <input type="text" ng-model="vm.expElem.link" name="icon"></md-input-container><md-input-container ng-class="{ \'md-input-invalid\' : vm.form.technologies.$invalid &amp;&amp; !vm.form.technologies.$pristine }"><label>Technologies</label> <input type="text" ng-model="vm.expElem.technologies" name="icon"></md-input-container><md-input-container ng-class="{ \'md-input-invalid\' : vm.form.description.$invalid &amp;&amp; !vm.form.description.$pristine }"><label>Description</label> <textarea ng-model="vm.expElem.description" name="icon"></textarea></md-input-container></form></md-dialog-content><md-dialog-actions class="layout-row layout-align-center-center"><md-button ng-click="vm.dialogSave()" ng-disabled="!vm.form.$valid" class="flex-xs-33">Save</md-button><md-button ng-click="vm.dialogClose()" class="flex-xs-33">Cancel</md-button></md-dialog-actions></md-dialog>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/_global/templates/text-edit.dialog.html',
    '<md-dialog class="user-edit-dialog dialog"><md-dialog-content><textarea data-ui-tinymce="data-ui-tinymce" data-ng-model="vm.tinymceModel"></textarea></md-dialog-content><md-dialog-actions class="layout-row layout-align-center-center"><md-button ng-click="vm.dialogSave()" class="flex-xs-33">Save</md-button></md-dialog-actions></md-dialog>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/experience/experience.template.html',
    '<div class="experience-page layout-column layout-align-space-around-center"><md-list class="layout-column layout-align-space-between-center"><md-list-item ng-repeat="experience in vm.experienceData track by $index"><md-card><md-card-header class="layout-row layout-xs-column layout-align-space-between-center layout-xs-align-start-center"><div class="card-sub-header layout-row"><md-card-avatar><img src="{{experience.icon ? experience.icon : \'https://cdn0.iconfinder.com/data/icons/business-and-finance-colored-3/64/business-and-finance-colored-3-11-512.png\'}}"></md-card-avatar><md-card-header-text><span class="md-title">{{experience.title}}</span><span class="md-subhead">{{experience.dateRange}}</span></md-card-header-text></div><div class="card-action-section layout-row layout-align-center-center"><md-button aria-label="trash" ng-click="vm.remove($index)" class="md-icon-button"><i aria-hidden="true" class="fas fa-trash-alt"></i></md-button><md-button aria-label="trash" ng-click="vm.openEditDialog(experience)" class="md-icon-button"><i aria-hidden="true" class="fas fa-edit"></i></md-button></div></md-card-header><md-card-content><p>{{experience.description}}</p><p class="technologies">{{experience.technologies}}</p><a ng-if="experience.link" href="{{experience.link}}" target="_blank">{{experience.link}}</a></md-card-content></md-card></md-list-item></md-list><md-button aria-label="edit button" ng-click="vm.openEditDialog({})" class="md-raised md-primary"><span class="md-padding">ADD</span></md-button></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/languages/languages.template.html',
    '<div class="languages-page"><md-list><md-list-item ng-repeat="lang in vm.myLangData"><div layout="row" class="flex-50"><div class="flex-30"><img alt="{{lang.name}}" ng-src="https://www.countryflags.io/{{lang.code}}/shiny/48.png"></div><p>{{ lang.name }}</p></div><md-input-container class="flex-50"><label>Level</label><md-select ng-model="lang.level"><md-option ng-repeat="lv in vm.levels" ng-value="lv" ng-disabled="vm.levels[$index] === lang.level">{{lv}}</md-option></md-select></md-input-container></md-list-item></md-list><div layout="row"><div class="flex-50"><md-button ng-click="vm.add()" ng-disabled="!vm.newLang.hasOwnProperty(\'name\') || !vm.newLang.hasOwnProperty(\'level\')" class="md-raised">ADD</md-button><md-input-container><label>Language</label><md-select ng-model="vm.newLang"><md-option ng-repeat="item in vm.codeLangData" ng-value="item">{{item.nativeName}}</md-option></md-select></md-input-container></div><md-input-container class="flex-50"><label>Level</label><md-select ng-model="vm.newLang.level"><md-option ng-repeat="lv in vm.levels" ng-value="lv">{{lv}}</md-option></md-select></md-input-container></div></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/summary/summary.template.html',
    '<div class="summary-page"><div class="layout-row layout-align-center-center"><div ng-bind-html="vm.tinymceModel" class="flex-70"></div></div><div class="layout-row layout-align-center-center"><md-button aria-label="edit button" ng-click="vm.openTextEditDialog()" class="md-raised md-primary"><span class="md-padding">Edit</span><i aria-hidden="true" class="fas fa-edit"></i></md-button></div></div>');
}]);
