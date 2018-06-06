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

        for(var key in vm.IDs) {
          $http.get(appConfig.dashboardServiceUrl + 'reports/' + key + '.json')
            .then(function (res) {
              vm.pageData = res.data.data.data;
              vm.pageData.image_url = res.data.data.images && res.data.data.images[0] && res.data.data.images[0].image_url;
              vm.pageData.analitic = _.chunk(angular.copy(res.data.data.analytics).slice(0, 3), 3);
              vm.pageData.file = res.data.data.files && res.data.data.files[0];
              vm.pageData.analitics = angular.copy(res.data.data.analytics);
              vm.pageData.count =vm.IDs[vm.pageData.id];
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
        $state.go('reports');
      };

      vm.editCount = function (id, index, value) {
        console.log('@@@@@@@@@@ ',id, index, value);
        if (vm.products[index].count + value >= 0) {
          vm.products[index].count = vm.products[index].count + value;
          vm.IDs[id] = vm.IDs[id] + value;
          localStorageService.set('products', vm.IDs);
          vm.all = vm.all + vm.products[index].price * value
        }

      };
    }
  });
