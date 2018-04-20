angular
  .module('app')
  .component('contactUsComponent', {
    templateUrl: 'app/components/contact-us/contact-us.tmpl.html',
    controller: function ($window, $http, appConfig) {
      this.firstName = '';
      this.lastName = '';
      this.title = '';
      this.company = '';
      this.phone = '';
      this.companyEmail = '';
      this.comments = '';

      this.contactUs = function () {
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          title: this.title,
          company: this.company,
          phone: this.phone,
          companyEmail: this.companyEmail,
          comments: this.comments
        };
        $http.get(appConfig.dashboardServiceUrl + 'contact_us', {
          params: user
        }).then(function (res) {
          if (res.data.status === 'ok') {
            $window.location.href = '#!/thank-youcontact';
          }
        });
      };
    }
  });
