angular
  .module('app')
  .component('inquiriesComponent', {
    templateUrl: 'app/components/inquiries/inquiries.tmpl.html',
    controller: function ($window, $state, $http, appConfig, categoryValues, dataValidate) {
      var currentName = $state.current.name;

      this.jobs = categoryValues('job function');
      this.companySizes = categoryValues('company size');
      this.industries = categoryValues('industry');
      this.countries = categoryValues('country');
      this.data = {};
      this.jobTitle = '';
      this.company = '';
      this.email = '';
      this.lastName = '';
      this.firstName = '';

      this.data = {
        firstName: {value: '', required: true, name: 'first name', type: 'provide'},
        lastName: {value: '', required: true, name: 'last name', type: 'provide'},
        email: {value: '', required: true, name: 'email', type: 'provide'},
        company: {value: '', required: true, name: 'company name', type: 'provide'},
        jobTitle: {value: '', required: true, name: 'job title', type: 'provide'},
        jobFunction: {value: '', required: true, name: 'job function', type: 'select'},
        compamySize: {value: '', required: true, name: 'company size', type: 'select'},
        industry: {value: '', required: true, name: 'industry', type: 'select'},
        country: {value: '', required: true, name: 'country', type: 'select'},
        description: {value: '', required: false, name: 'description', type: 'enter'}
      };

      switch (currentName) {
        case 'productInquiry':
          this.data.permissions = {
            'Daily Insights': true,
            'Research Partner': true,
            'Education Offerings': true,
            required: false
          };
          this.data.relationship = {
            'Expert Panelist': true,
            required: false
          };
          this.caption = 'Product Inquiry';
          this.inquire1 = true;
          this.url = 'product_partner';
          break;

        case 'partnershipInquire':
          this.caption = 'Inquire about Data Partnership';
          this.inquire2 = true;
          this.url = 'new_data_partners';
          break;

        default:
          this.caption = 'Inquire about Education Partnership';
          this.url = 'new_education_partners';
          this.inquire3 = true;
          this.jobs.unshift('Educator');
          break;
      }

      this.send = function (inquiryType) {
        if (dataValidate.validate(this.data)) {
          if (this.data.permissions) {
            var permissions = [];
            for (var i in this.data.permissions) {
              if (this.data.permissions[i]) {
                permissions.push(i);
              }
            }
            this.data.permissions = JSON.stringify(permissions);
          }
          if (this.data.permissions) {
            if (this.data.relationship['Expert Panelist']) {
              this.data.relationship = 'Expert Panelist';
            }
          }
          $http.get(appConfig.dashboardServiceUrl + this.url, {
            params: this.data
          }).then(function (res) {
            if (res.data.status === 'ok') {
              $window.location.href = '#!/thank-you' + inquiryType;
            }
          });
        }
      };
    }
  });
