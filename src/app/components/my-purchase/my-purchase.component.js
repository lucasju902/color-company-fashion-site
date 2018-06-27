angular
  .module('app')
  .component('myPurchaseComponent', {
    templateUrl: 'app/components/my-purchase/my-purchase.tmpl.html',
    controller: function ($state, $http, appConfig, $scope, authService, localStorageService) {
      var vm = this;
      vm.data = {};

      function init() {
        if (vm.user && vm.user.id) {
          $http.get(appConfig.dashboardServiceUrl + '/members/bought_items.json', {params: {id: vm.user.id}})
            .then(function (res) {
              vm.data = res.data;
              console.log('@@@@@@@@@@ vm.data',vm.data);
            });
        }
      }

      $scope.$watch(function () {
        return authService.currentUser;
      }, function (newVal) {
        vm.user = localStorageService.get('currentUser');
        init();
      });
    }
  });
