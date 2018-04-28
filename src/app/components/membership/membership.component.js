angular
  .module('app')
  .component('membershipComponent', {
    templateUrl: 'app/components/membership/membership.tmpl.html',
    controller: function ($window, $stateParams, $state, scrollService, categoryValues, $http, appConfig, modalService, dataValidate) {
      scrollService.scrollMember();
      this.permissions = {
        'Daily Insights': true,
        'Research Partner': true,
        'Education Offerings': true
      };
      this.relationship = {
        'Expert Panelist': true
      };
      this.jobs = categoryValues('job function');
      this.countries = categoryValues('country');
      this.industries = categoryValues('industry');
      this.compamySizes = categoryValues('company size');

      this.data = {
        firstName: {value: '', required: true, name: 'first name', type: 'provide'},
        lastName: {value: '', required: true, name: 'last name', type: 'provide'},
        email: {value: '', required: true, name: 'email', type: 'provide'},
        company: {value: '', required: true, name: 'company name', type: 'provide'},
        jobTitle: {value: '', required: true, name: 'job title', type: 'provide'},
        jobFunction: {value: '', required: true, name: 'job function', type: 'select'},
        compamySize: {value: '', required: true, name: 'company size', type: 'select'},
        industry: {value: '', required: true, name: 'industry', type: 'select'},
        country: {value: '', required: true, name: 'country'}
      };

      this.submitInquiry = function () {
        if (dataValidate.validate(this.data)) {
          this.data.permissions = [];
          for (var i in this.permissions) {
            if (this.permissions[i]) {
              this.data.permissions.push(i);
            }
          }
          if (this.relationship['Expert Panelist']) {
            this.data.relationship = 'Expert Panelist';
          }
          this.data.permissions = JSON.stringify(this.data.permissions);
          $http.get(appConfig.dashboardServiceUrl + 'new_member', {
            params: this.data
          }).then(function (res) {
            if (res.data.status === 'ok') {
              $window.location.href = '#!/thank-youmembership';
            }
          });
        }
      };
    }
  });
