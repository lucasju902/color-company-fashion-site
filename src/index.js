var app = angular.module('app', [
  'ngResource',
  'ngCookies',
  'ngSanitize',
  'countTo',
  'angular-extend-promises',
  'ui.router',
  'ui.select',
  'ui.bootstrap'
]);

var config = {
  routeUrl: ''
};

app.value('config', config);
var run = ['$rootScope', 'authService', '$state', '$transitions', 'modalService', '$anchorScroll',
  function ($rootScope, authService, $state, $transitions, modalService, $anchorScroll) {
    $rootScope.currentUser = {};
    authService.loadCurrentUser().then(function (res) {

      if ($state.$current.self.protected && !$rootScope.currentUser.is_member) {
        $state.go('aboutPage');
      }
      $transitions.onStart({}, function (transition) {
        if (transition.to().protected && !$rootScope.currentUser.is_member) {
          modalService.showModal(1);
          return false;
        }
      });
    });
    $anchorScroll.yOffset = 85;

    $rootScope.$on('$viewContentLoaded', function () {
      angular.element('html, body').animate({scrollTop: 0}, 200);
    });
  }];

app.run(run);

angular.module('app').constant('appConfig', {
  appName: 'huefashion',
  webServiceUrl: 'https://huefashion2.herokuapp.com/api/',
  autoServiceUrl: 'https://hueauto.herokuapp.com/api/',
  brandingServiceUrl: 'https://huebrand.herokuapp.com/api/',
  legalServiceUrl: 'https://huelegal.herokuapp.com/api/',
  authServiceUrl: 'http://localhost:5000',
  // authServiceUrl: '',
  // dashboardServiceUrl: 'http://localhost:3000/',
  dashboardServiceUrl: 'https://gentle-bastion-76293.herokuapp.com/',

  repositories: {
    mainParams: ['region_id', 'designer_id', 'category_id', 'season_id', 'year', 'city_id']
  }
});
