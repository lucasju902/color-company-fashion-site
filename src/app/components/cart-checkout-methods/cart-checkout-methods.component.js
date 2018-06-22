angular
  .module('app')
  .component('cartCheckoutMethodsComponent', {
    templateUrl: 'app/components/cart-checkout-methods/cart-checkout-methods.tmpl.html',
    controller: function (categoryValues, dataValidate, $state, $http, appConfig, $location, anchorSmoothScroll, localStorageService, authService, $timeout) {
      var vm = this;
      vm.user = localStorageService.get('currentUser');
      vm.methodNumber = 1;
      vm.payError = false;

      vm.getBillingData = function () {
        $http.get(appConfig.dashboardServiceUrl + 'billing_infos/' + vm.user.id + '.json')
          .then(function (res) {
            // console.log('res',res);
            if (res && res.data && res.data[0]) {
              // console.log('res',res);

              for (var key in vm.data) {
                if (key === 'state') {
                  var index = _.findIndex(vm.states, function (item) {
                    return item.title === res.data[0][key];
                  });
                  vm.data[key].value = vm.states[index];
                }
                if (key === 'country') {
                  var index2 = _.findIndex(vm.country, function (item) {
                    return item.title === res.data[0][key];
                  });
                  vm.data[key].value = vm.country[index2];
                }
                vm.data[key].value = res.data[0][key] || '';
              }
            }
            if (!vm.data.email.value && vm.user) {
              vm.data.email.value = vm.user.email;
            }
            vm.continue();
          })
          .catch(function (err) {
            // console.log('ERROR',err);
          });
      };

      vm.login = function () {
        vm.error = false;
        authService.login(this.email, this.password)
          .then(function (data) {
            if (data && data.success) {
              vm.user = localStorageService.get('currentUser');
              vm.getBillingData();
            } else {
              vm.error = true;
            }
          });
      };

      vm.uploadBillingInfo = function () {
        if (vm.user.id) {
          var data = {};
          for (var item in vm.data) {
            if (vm.data[item].type === 'select') {
              data[item] = vm.data[item].value.title;
            } else {
              data[item] = vm.data[item].value;
            }
          }
          data.member_id = vm.user.id;
          $http.post(appConfig.dashboardServiceUrl + 'billing_infos.json', data)
            .then(function (res) {
              vm.continue();
            })
            .catch(function (err) {
              // console.log('ERROR',err);
            });
        } else {
          vm.continue();
        }
      };

      vm.continue = function () {
        if (vm.methodNumber === 2 && !dataValidate.validate(vm.data)) {
          return;
        }
        vm.methodNumber = vm.methodNumber + 1;
        if (vm.methodNumber === 3 && !vm.purchase.amount) {
          vm.methodNumber = 4;
        }
        if (vm.maxMethod < vm.methodNumber) {
          vm.maxMethod = vm.methodNumber;
        }
        vm.editGrayList();
      };

      vm.editGrayList = function () {
        vm.methodStyle.forEach(function (value, index) {
          if (index === vm.methodNumber - 1) {
            vm.methodStyle[index] = 'black';
          } else {
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
        vm.errFlag = false;
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
        } else {
          vm.getBillingData();
          vm.loginFlag = true;

        }
      };

      vm.stepBack = function () {
        vm.methodNumber = vm.methodNumber - 1;
        vm.editGrayList();
      };

      vm.goToThank = function () {
        $timeout(function () {
          vm.errFlag = false;
          vm.placeOrderFlag = true;
        }, 0);
        var data = {
          id: vm.user.id || 0,
          email: vm.data.email.value,
          reports: vm.purchase.IDs.reports,
          teaching_materials: vm.purchase.IDs.teaching_materials,
          courses: vm.purchase.IDs.courses,
          payment_method_nonce: vm.nonce
        };
        $http.get(appConfig.dashboardServiceUrl + 'checkouts', {params: data})
          .then(function (res) {
            if (res) {
              console.log('res', res);
              vm.info = res.data.info;
              if (res.data.status === 'fail') {
                vm.errFlag = true;
                $timeout(function () {
                  vm.placeOrderFlag = false;
                }, 0);
              } else {
                vm.errFlag = false;
                $timeout(function () {
                  vm.placeOrderFlag = false;
                }, 0);
                $state.go('cart-thank', {id: res.data.orderId});
              }
            }
          })
          .catch(function (err) {
            vm.placeOrderFlag = false;
            vm.errFlag = true;
          });
      };

      vm.nonce = false;
      vm.errFlag = false;
      vm.payDataFlag = false;
      vm.placeOrderFlag = false;
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
        zip: {value: '', required: true, name: 'zip', type: 'numeric'},
        telephone: {value: '', required: true, name: 'telephone', type: 'numeric'},
        state: {
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
          // console.error(err);
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
            // console.error(err);
            return;
          }
          hostedFieldsInstance.on('validityChange', function (event) {
            $timeout(function () {
              vm.payError = false;
            }, 0);
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
            $timeout(function () {
              vm.payDataFlag = true;
            }, 0);

            event.preventDefault();
            hostedFieldsInstance.tokenize(function (err, payload) {
              if (err) {
                $timeout(function () {
                  vm.payError = err.message;
                  vm.payDataFlag = false;
                  // console.error(err);
                  return;
                }, 0);
              }
              // This is where you would submit payload.nonce to your server
              $timeout(function () {
                if (payload && payload.nonce) {
                  vm.nonce = payload.nonce;
                  vm.continue();
                  vm.payDataFlag = false;
                }
              }, 0);
            });
          });
        });
      });
    }
  });