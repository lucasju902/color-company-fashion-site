angular
  .module('app')
  .component('membershipComponent', {
    templateUrl: 'app/components/membership/membership.tmpl.html',
    controller: function ($window, $stateParams, $state, scrollService, categoryValues, $http, appConfig, modalService) {
      scrollService.scrollMember()
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
      this.country = '';
      this.industry = '';
      this.compamySize = '';
      this.jobTitle = '';
      this.jobFunction = '';
      this.company = '';
      this.email = '';
      this.lastName = '';
      this.firstName = '';

      this.data = {
        country: {value: '', required: true, name: 'Country', type: 'select'},
        industry: {value: '', required: true, name: 'Industry', type: 'select'},
        compamySize: {value: '', required: true, name: 'Country', type: 'select'},
        jobTitle: {value: '', required: true, name: 'Country', type: 'provide'},
        jobFunction: {value: '', required: true, name: 'Country', type: 'select'},
        company: {value: '', required: true, name: 'Country', type: 'provide'},
        email: {value: '', required: true, name: 'Country', type: 'provide'},
        lastName: {value: '', required: true, name: 'Country', type: 'provide'},
        firstName: {value: '', required: true, name: 'Country', type: 'provide'}
      }

      this.submitInquiry = function () {
        var data = {
          email: this.email,
          country: this.country || '-',
          industry: this.industry || '-',
          company_size: this.compamySize || '-',
          job_title: this.jobTitle || '-',
          job_function: this.jobFunction || '-',
          company: this.company || '-',
          last_name: this.lastName || '-',
          first_name: this.firstName || '-',
          permissions: []
        };
        var checker = true;
        for (item in data) {
          if (data[item] === '') {
            checker = false;
          } else if (data[item] === undefined) {
            checker = false;
          }
        }
        if (!checker) {
          modalService.showModal(0, null, data);
        } else {
          for (var i in this.permissions) {
            if (this.permissions[i]) {
              data.permissions.push(i);
            }
          }
          if (this.relationship['Expert Panelist']) {
            data.relationship = 'Expert Panelist';
          }
          data.permissions = JSON.stringify(data.permissions);
          $http.get(appConfig.dashboardServiceUrl + 'new_member', {
            params: data
          }).then(function (res) {
            if (res.data.status === 'ok') {
              this.email = '';
              this.country = '';
              this.industry = '';
              this.compamySize = '';
              this.jobTitle = '';
              this.jobFunction = '';
              this.company = '';
              this.email = '';
              this.lastName = '';
              this.firstName = '';
              $window.location.href = '#!/thank-youmembership';
            }
          });
        };
      };
    }
  });
