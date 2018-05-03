angular
  .module('app')
  .component('inquiriesComponent', {
    templateUrl: 'app/components/inquiries/inquiries.tmpl.html',
    controller: function ($state, $http, appConfig, categoryValues, dataValidate) {
      var currentName = $state.current.name;

      this.jobs = categoryValues('job function');
      this.companySizes = categoryValues('company size');
      this.industries = categoryValues('industry');
      this.countries = categoryValues('country');

      this.data = {
        first_name: {value: '', required: true, name: 'first name', type: 'provide'},
        last_name: {value: '', required: true, name: 'last name', type: 'provide'},
        email: {value: '', required: true, name: 'email', type: 'provide'},
        company: {value: '', required: true, name: 'company name', type: 'provide'},
        job_title: {value: '', required: true, name: 'job title', type: 'provide'},
        job_function: {value: '', required: true, name: 'job function', type: 'select'},
        company_size: {value: '', required: true, name: 'company size', type: 'select'},
        industry: {value: '', required: true, name: 'industry', type: 'select'},
        country: {value: '', required: true, name: 'country', type: 'select'}
      };

      switch (currentName) {
        case 'productInquiry':
          this.data.permissions = {daily: true, research: true, edu: true, required: false};
          this.data.relationship = {expert: true, required: false};
          this.caption = 'Product Inquiry';
          this.inquire1 = true;
          this.url = 'product_partner';
          break;

        case 'partnershipInquire':
          this.caption = 'Inquire about Data Partnership';
          this.inquire2 = true;
          this.url = 'new_data_partners';
          this.data.description = {value: '', required: false, name: 'description', type: 'enter'};
          break;

        default:
          this.caption = 'Inquire about Education Partnership';
          this.url = 'new_education_partners';
          this.inquire3 = true;
          this.jobs.unshift('Educator');
          this.data.description = {value: '', required: false, name: 'description', type: 'enter'};
          break;
      }

      this.send = function (inquiryType) {
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
          $http.get(appConfig.dashboardServiceUrl + this.url, {
            params: data
          }).then(function (res) {
            if (res.status === 200) {
              $state.go('thank-you', {parFrom: inquiryType});
            }
          });
        }
      };
    }
  });
