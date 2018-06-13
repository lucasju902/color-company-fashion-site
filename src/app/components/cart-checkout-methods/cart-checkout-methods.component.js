angular
  .module('app')
  .component('cartCheckoutMethodsComponent', {
    templateUrl: 'app/components/cart-checkout-methods/cart-checkout-methods.tmpl.html',
    controller: function ($state, $http, appConfig, $location, anchorSmoothScroll, localStorageService, $stateParams) {
      var vm = this;
      vm.methodNumber = 1;
      vm.maxMethod = 1;
      vm.methodStyle = ['black', 'gray', 'gray', 'black'];
      vm.registerAndCheckout = false;
      vm.checkoutAsGuest = false

      vm.email = '';
      vm.password = '';
      vm.error = true;

      vm.login = function () {
        self.error = false;
        authService.login(this.email, this.password)
          .then(function (data) {
            if (data && data.success) {
              // $state.go('aboutPage');
            } else {
              self.error = true;
            }
          });
      }
    }
  });