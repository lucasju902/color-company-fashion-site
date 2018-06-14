angular
  .module('app')
  .component('cartCheckoutComponent', {
    templateUrl: 'app/components/cart-checkout/cart-checkout.tmpl.html',
    controller: function ($state, $http, appConfig, localStorageService, modalService) {
      var submitBtn = document.getElementById('my-submit');
      var form = document.getElementById('my-sample-form');
      var purchase =  localStorageService.get('purchase');

      braintree.client.create({
        authorization: 'sandbox_kzkdbmyv_6swqvczbg4bk7gpx'
      }, clientDidCreate);

      function clientDidCreate(err, client) {
        braintree.hostedFields.create({
          client: client,
          styles: {
            'input': {
              'font-size': '16pt',
              'color': '#3A3A3A',
              'border': '1px solid gray'
            },

            '.number': {
              'font-family': 'monospace'
            },

            '.valid': {
              color: 'green'
            }
          },
          fields: {
            number: {
              selector: '#card-number'
            },
            cvv: {
              selector: '#cvv'
            },
            expirationDate: {
              selector: '#expiration-date'
            }
          }
        }, hostedFieldsDidCreate);
      }

      function hostedFieldsDidCreate(err, hostedFields) {
        submitBtn.addEventListener('click', submitHandler.bind(null, hostedFields));
        submitBtn.removeAttribute('disabled');
      }

      function submitHandler(hostedFields, event) {
        modalService.showModal(4, null, purchase.products);
        event.preventDefault();
        submitBtn.setAttribute('disabled', 'disabled');

        hostedFields.tokenize(function (err, payload) {
          if (err) {
            submitBtn.removeAttribute('disabled');
            console.error(err);
          } else {
            // $http({
            //   url: appConfig.dashboardServiceUrl + 'checkouts.json',
            //   method: 'GET',
            //   params: {
            //     amount: 10.00,
            //     payment_method_nonce: payload.nonce}
            // }).then(function (res) {
            //   alert(res.data.info);
            //   console.log('@@@@@@@@@@ ',res);
            //   modalService.showModal(5, null, purchase.products);
            //   // $state.go('cart-page');
            // });
            // form.submit();
          }
        });
      }
    }
  });
