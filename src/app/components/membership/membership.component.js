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
        country: {value: '', required: true, name: 'country', type: 'select'}
      };

      this.submitInquiry = function () {
        if (dataValidate.validate(this.data)) {
          var data = {};
          for (var item in this.data) {
            if (item !== 'permissions' && item !== 'relationship') {
              data[item] = this.data[item].value;
            }
          }
          data.job_title = data.jobTitle;
          delete data.jobTitle;
          data.job_function = data.jobFunction;
          delete data.jobFunction;
          data.last_name = data.lastName;
          delete data.lastName;
          data.first_name = data.firstName;
          delete data.firstName;
          data.company_size = data.compamySize;
          delete data.compamySize;

          this.data.permissions = [];
          for (var i in this.permissions) {
            if (this.permissions[i]) {
              this.data.permissions.push(i);
            }
          }
          if (this.relationship['Expert Panelist']) {
            data.relationship = 'Expert Panelist';
          }
          data.permissions = JSON.stringify(this.data.permissions);
          $http.get(appConfig.dashboardServiceUrl + 'new_member', {
            params: data
          }).then(function (res) {
            if (res.data.status === 'ok') {
              $window.location.href = '#!/thank-youmembership';
            }
          });
        }
      };
    }
  });
