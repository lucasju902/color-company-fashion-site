angular
  .module('app')
  .component('cartCheckoutMethodsComponent', {
    templateUrl: 'app/components/cart-checkout-methods/cart-checkout-methods.tmpl.html',
    controller: function ($state, $http, appConfig, $location, anchorSmoothScroll, localStorageService, categoryValues) {
      var vm = this;
      vm.methodNumber = 2;
      vm.maxMethod = 2;
      vm.methodStyle = ['gray', 'black', 'gray', 'black'];
      vm.registerAndCheckout = false;
      vm.checkoutAsGuest = false;
      vm.country = categoryValues('country');
      vm.states = categoryValues('states');

      vm.email = '';
      vm.password = '';
      vm.error = '';

      vm.data = {
        first_name: {value: '', required: true, name: 'first name', type: 'provide'},
        last_name: {value: '', required: true, name: 'last name', type: 'provide'},
        email: {value: '', required: true, name: 'email', type: 'provide'},
        middle_name: {value: '', name: 'middle name', type: 'provide'},
        address: {value: '', required: true, name: 'address', type: 'provide'},
        second_address: {value: '', name: 'second_address', type: 'provide'},
        city: {value: '', required: true, name: 'city', type: 'provide'},
        zip: {value: '', required: true, name: 'zip', type: 'provide'},
        telephone: {value: '', required: true, name: 'telephone', type: 'provide'},
        // bio: {value: vm.userData.bio, name: 'bio', type: 'provide'},
        // job_function: {
        //   value: vm.job_function[vm.indexes.job_function] || vm.userData.job_function,
        //   required: true,
        //   name: 'job function',
        //   type: 'select'
        // },
        // company_size: {
        //   value: vm.company_size[vm.indexes.company_size] || vm.userData.company_size,
        //   required: true,
        //   name: 'company size',
        //   type: 'select'
        // },
        // industry: {
        //   value: vm.industry[vm.indexes.country] || vm.userData.industry,
        //   required: true,
        //   name: 'industry',
        //   type: 'select'
        // },
        states: {value: vm.states[0],
          required: true,
          name: 'state',
          type: 'select'
        },
        country: {value: vm.country[0],
          required: true,
          name: 'country',
          type: 'select'
        }
      };

      vm.login = function () {
        vm.error = false;
        authService.login(this.email, this.password)
          .then(function (data) {
            if (data && data.success) {
              // $state.go('aboutPage');
            } else {
              vm.error = true;
            }
          });
      };
    }
  });