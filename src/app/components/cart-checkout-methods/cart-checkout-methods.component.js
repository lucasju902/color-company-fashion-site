angular
  .module('app')
  .component('cartCheckoutMethodsComponent', {
    templateUrl: 'app/components/cart-checkout-methods/cart-checkout-methods.tmpl.html',
    controller: function (categoryValues,dataValidate, $state, $http, appConfig, $location, anchorSmoothScroll, localStorageService, authService) {
      var vm = this;

      vm.login = function () {
        vm.error = false;
        authService.login(this.email, this.password)
          .then(function (data) {
            if (data && data.success) {
              vm.continue();
            } else {
              vm.error = true;
            }
          });
      };

      vm.continue = function () {
        if (vm.methodNumber === 2) {
          if(!dataValidate.validate(vm.data)) {
            return;
          }
        }
        vm.methodNumber = vm.methodNumber + 1;
        if (vm.maxMethod < vm.methodNumber) {
          vm.maxMethod = vm.methodNumber;
        }
        vm.editGrayList();
      };

      vm.editGrayList = function () {
        vm.methodStyle.forEach(function (value, index) {
          if (index === vm.methodNumber - 1) {
            vm.methodStyle[index] = 'black';
          }else {
            vm.methodStyle[index] = 'gray';
          }
        });
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

      vm.goToMethod = function (number) {
        vm.methodNumber = number;
        vm.editGrayList();
      };

      vm.passwordRecover = function () {
        $state.go('password-recover-cart');
      };

      vm.userIsLoggedIn = function () {
        if (!Object.keys(vm.user).length) {
          vm.loginFlag = false;
          vm.methodNumber = 1;
        }else{
          vm.loginFlag = true;
          vm.methodNumber = 2;
          vm.maxMethod = 2;
        }
      };

      vm.stepBack = function () {
        vm.methodNumber = vm.methodNumber - 1;
        vm.editGrayList();
      };

      vm.goToThank = function () {
        $state.go('cart-thank');
      };

      vm.user = localStorageService.get('currentUser');
      vm.maxMethod = 1;
      vm.tax = 0;
      vm.methodStyle = ['gray', 'gray', 'gray', 'gray'];
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
        states: {
          value: vm.states[0],
          required: true,
          name: 'state',
          type: 'select'
        },
        country: {
          value: vm.country[0],
          required: true,
          name: 'country',
          type: 'select'
        }
      };

      vm.products = [];
      vm.all = 0;
      vm.purchase = localStorageService.get('purchase');

      vm.getProductItems(vm.purchase.IDs.reports, 'reports');
      vm.getProductItems(vm.purchase.IDs.courses, 'courses');
      vm.getProductItems(vm.purchase.IDs.teaching_materials, 'teaching_materials');
      vm.userIsLoggedIn();
      vm.editGrayList();

      braintree.client.create({
        authorization: 'sandbox_kzkdbmyv_6swqvczbg4bk7gpx'
      }, function (err, clientInstance) {
        if (err) {
          console.error(err);
          return;
        }
        braintree.hostedFields.create({
          client: clientInstance,
          styles: {
            'input': {
              'font-size': '14px',
              'font-family': 'helvetica, tahoma, calibri, sans-serif',
              'color': '#3a3a3a'
            },
            ':focus': {
              'color': 'black'
            }
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: 'CREDIT CARD NUMBER'
            },
            cvv: {
              selector: '#cvv',
              placeholder: 'CVV'
            },
            expirationMonth: {
              selector: '#expiration-month',
              placeholder: 'MONTH',
              select: {
                options: [
                  '01',
                  '02',
                  '03',
                  '04',
                  '05',
                  '06',
                  '07',
                  '08',
                  '09',
                  '10',
                  '11',
                  '12'
                ]
              }
            },
            expirationYear: {
              selector: '#expiration-year',
              placeholder: 'YEAR',
              select: {
                options: true
              }
            }
          }
        }, function (err, hostedFieldsInstance) {
          if (err) {
            console.error(err);
            return;
          }
          hostedFieldsInstance.on('validityChange', function (event) {
            var field = event.fields[event.emittedBy];
            if (field.isValid) {
              if (event.emittedBy === 'expirationMonth' || event.emittedBy === 'expirationYear') {
                if (!event.fields.expirationMonth.isValid || !event.fields.expirationYear.isValid) {
                  return;
                }
              } else if (event.emittedBy === 'number') {
                $('#card-number').next('span').text('');
              }
              // Remove any previously applied error or warning classes
              $(field.container).parents('.form-group').removeClass('has-warning');
              $(field.container).parents('.form-group').removeClass('has-success');
              // Apply styling for a valid field
              $(field.container).parents('.form-group').addClass('has-success');
            } else if (field.isPotentiallyValid) {
              // Remove styling  from potentially valid fields
              $(field.container).parents('.form-group').removeClass('has-warning');
              $(field.container).parents('.form-group').removeClass('has-success');
              if (event.emittedBy === 'number') {
                $('#card-number').next('span').text('');
              }
            } else {
              // Add styling to invalid fields
              $(field.container).parents('.form-group').addClass('has-warning');
              // Add helper text for an invalid card number
              if (event.emittedBy === 'number') {
                $('#card-number').next('span').text('Looks like this card number has an error.');
              }
            }
          });
          hostedFieldsInstance.on('cardTypeChange', function (event) {
            // Handle a field's change, such as a change in validity or credit card type
            if (event.cards.length === 1) {
              $('#card-type').text(event.cards[0].niceType);
            } else {
              $('#card-type').text('Card');
            }
          });
          $('.panel-body').submit(function (event) {
            event.preventDefault();
            hostedFieldsInstance.tokenize(function (err, payload) {
              if (err) {
                console.error(err);
                return;
              }
              // This is where you would submit payload.nonce to your server
              vm.payload = payload;
              // console.log('@@@@@@@@@@ ',payload);
              // vm.continue();
            });
          });
        });
      });
    }
  });