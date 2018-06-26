angular
  .module('app')
  .component('cartThankPageComponent', {
    templateUrl: 'app/components/cart-thank-page/cart-thank-page.tmpl.html',
    controller: function ($state, $http, appConfig, localStorageService, $stateParams) {
      var vm = this;

      if (!$stateParams.id || !localStorageService.get('purchase')) {
        $state.go('landing');
      }else{
        vm.orderId = $stateParams.id;
        vm.purchase = localStorageService.get('purchase');
        localStorageService.remove('purchase');
        localStorageService.set('products', {courses: {}, reports: {}, teaching_materials: {}});
        vm.products = [];

        vm.getProductItems = function (obj, name) {
          for (var key in obj) {
            $http.get(appConfig.dashboardServiceUrl + name + '/' + key + '.json')
              .then(function (res) {
                vm.pageData = res.data.data.data;
                vm.pageData.image_url = res.data.data.images && res.data.data.images[0] && res.data.data.images[0].image_url;
                vm.pageData.analitic = _.chunk(angular.copy(res.data.data.analytics).slice(0, 3), 3);
                vm.pageData.file = res.data.data.files && res.data.data.files[0];
                vm.pageData.analitics = angular.copy(res.data.data.analytics);
                vm.pageData.count = obj[key];
                vm.pageData.type = name;
                vm.products.push(vm.pageData);
              });
          }
        };
        vm.url = 'http://dl3.joxi.net/drive/2018/06/06/0030/1032/1967112/12/35aff2c941.png';

        vm.getProductItems(vm.purchase.IDs.reports, 'reports');
        vm.getProductItems(vm.purchase.IDs.courses, 'courses');
        vm.getProductItems(vm.purchase.IDs.teaching_materials, 'teaching_materials');
      }
    }
  });
