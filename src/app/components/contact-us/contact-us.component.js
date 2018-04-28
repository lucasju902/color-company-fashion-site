angular
  .module('app')
  .component('contactUsComponent', {
    templateUrl: 'app/components/contact-us/contact-us.tmpl.html',
    controller: function ($window, $http, appConfig, dataValidate) {
      this.data = {
        firstName: {value: '', required: true, name: 'first name', type: 'provide'},
        lastName: {value: '', required: true, name: 'last name', type: 'provide'},
        title: {value: '', required: true, name: 'title', type: ''},
        company: {value: '', required: true, name: 'company name', type: 'provide'},
        phone: {value: '', required: true, name: 'phone number', type: 'enter'},
        companyEmail: {value: '', required: true, name: 'company email', type: 'provide'},
        comments: {value: '', required: true, name: 'comments', type: 'enter'}
      };

      this.contactUs = function () {
        if (dataValidate.validate(this.data)) {
          $http.get(appConfig.dashboardServiceUrl + 'contact_us', {
            params: this.data
          }).then(function (res) {
            if (res.data.status === 'ok') {
              $window.location.href = '#!/thank-youcontact';
            }
          });
        }
      };
    }
  });
