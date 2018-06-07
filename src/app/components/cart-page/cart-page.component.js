angular
  .module('app')
  .component('cartPageComponent', {
    templateUrl: 'app/components/cart-page/cart-page.tmpl.html',
    controller: function ($state, $http, appConfig, $location, anchorSmoothScroll, localStorageService) {
      var vm = this;

      vm.init = function () {
        vm.products = [];
        vm.all = 0;
        vm.IDs = localStorageService.get('products');
        vm.whichPage = localStorageService.get('whichPage');

        vm.getProductItems(vm.IDs.reports, 'reports');
        vm.getProductItems(vm.IDs.courses, 'courses');
        vm.getProductItems(vm.IDs.teaching_materials, 'teaching_materials');
      };

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
              vm.all = vm.all + (vm.pageData.price * vm.pageData.count);
              vm.products.push(vm.pageData);
            });
        }
      };

      vm.goCheckout = function () {
        $state.go('cart-checkout');
      };

      vm.removeProduct = function (id) {
        delete vm.IDs[id];
        localStorageService.set('products', vm.IDs);
        vm.init();
      };

      vm.goReports = function () {
        $state.go(vm.whichPage.link);
      };

      vm.editCount = function (id, index, value, type) {
        if (vm.products[index].count + value >= 0) {
          vm.products[index].count = vm.products[index].count + value;
          vm.IDs[type][id] = vm.IDs[type][id] + value;
          localStorageService.set('products', vm.IDs);
          vm.all = vm.all + vm.products[index].price * value;
        }

      };
    }
  });
