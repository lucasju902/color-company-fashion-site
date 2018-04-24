angular
  .module('app')
  .component('aboutPage', {
    templateUrl: 'app/components/about-page/about-page.tmpl.html',
    controller: function ($http, appConfig, $location, $anchorScroll) {
      var vm = this;
      vm.pageData = {};

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'abouts/1.json')
          .then(function (res) {
            if (res && res.data) {
              // var keys = Object.keys(res.data).filter(function (item) {
              //   return !!~item.indexOf('_url');
              // });
              //
              // angular.forEach(keys, function (key) {
              //   res.data[key] = appConfig.dashboardServiceUrl + res.data[key]
              // });

              vm.pageData = res.data;
            }
          });
      };

      angular.element(window.scrollTo(0, 0));
      vm.playerAPI = function (action) {
        vm.vimeoPlayer = angular.element('iframe#companyVimeoVideo')[0];
        if (vm.vimeoPlayer) {
          vm.vimeoAPI = $f(vm.vimeoPlayer).api(action);
        }
      };

      vm.showVideoPopup = function () {
        angular.element('#video-popup').show();
        angular.element('body').addClass('modal-open');
      };

      vm.hideVideoPopup = function () {
        vm.playerAPI('pause');
        angular.element('#video-popup').hide();
        angular.element('body').removeClass('modal-open');
      };

      vm.scrollToFooter = function () {
        $location.hash('prefooter');
        $anchorScroll();
        $location.hash('');
      };
    }
  })
