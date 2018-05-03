angular
  .module('app')
  .component('membershipComponent', {
    templateUrl: 'app/components/membership/membership.tmpl.html',
    controller: function ($stateParams, $state, scrollService, categoryValues, $http, appConfig, modalService, dataValidate) {
      scrollService.scrollMember();
      this.jobs = categoryValues('job function');
      this.countries = categoryValues('country');
      this.industries = categoryValues('industry');
      this.compamySizes = categoryValues('company size');

      this.data = {
        first_name: {value: '', required: true, name: 'first name', type: 'provide'},
        last_name: {value: '', required: true, name: 'last name', type: 'provide'},
        email: {value: '', required: true, name: 'email', type: 'provide'},
        company: {value: '', required: true, name: 'company name', type: 'provide'},
        job_title: {value: '', required: true, name: 'job title', type: 'provide'},
        job_function: {value: '', required: true, name: 'job function', type: 'select'},
        company_size: {value: '', required: true, name: 'company size', type: 'select'},
        industry: {value: '', required: true, name: 'industry', type: 'select'},
        country: {value: '', required: true, name: 'country', type: 'select'},
        permissions: {daily: true, research: true, edu: true, required: false},
        relationship: {expert: true, required: false}
      };

      this.submitInquiry = function () {
        if (dataValidate.validate(this.data)) {
          var data = {};
          for (var item in this.data) {
            if (item !== 'permissions' && item !== 'relationship') {
              data[item] = this.data[item].value;
            } else if (item === 'permissions') {
              data.permissions = [];
              _.forEach(this.data[item], function (i, k) {
                if (i === true) {
                  data.permissions.push(categoryValues('permissions')[k]);
                }
              });
              data.permissions = JSON.stringify(data.permissions);
            } else if (item === 'relationship' && this.data.relationship.expert) {
              data.relationship = 'Expert Panelist';
            }
          }
          $http.get(appConfig.dashboardServiceUrl + 'new_member', {
            params: data
          }).then(function (res) {
            if (res.status === 200) {
              $state.go('thank-you', {parFrom: 'membership'});
            }
          });
        }
      };
    }
  });
