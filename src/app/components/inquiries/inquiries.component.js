angular
  .module('app')
  .component('inquiriesComponent', {
    templateUrl: 'app/components/inquiries/inquiries.tmpl.html',
    controller: function ($window, $state, $http, appConfig, categoryValues) {
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

      switch (currentName) {
        case 'productInquiry':
          this.data = {
            permissions: {
              'Daily Insights': true,
              'Research Partner': true,
              'Education Offerings': true
            },
            relationship: {
              'Expert Panelist': true
            }
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
          break;
      }

      this.send = function (inquiryType) {
        var data = {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          company: this.company,
          job_title: this.jobTitle,
          job_function: this.data.jobFunction,
          company_size: this.data.compamySize,
          industry: this.data.industry,
          country: this.data.country,
          description: this.data.tellUsColorData || this.data.tellUsEduInt || ''
        };

        if (this.data.permissions) {
          data.permissions = [];
          for (var i in this.data.permissions) {
            if (this.data.permissions[i]) {
              data.permissions.push(i);
            }
          }
          data.permissions = JSON.stringify(data.permissions);
        }
        if (this.data.permissions) {
          if (this.data.relationship['Expert Panelist']) {
            data.relationship = 'Expert Panelist';
          }
        }
        var checker = true;
        if (this.inquire1) {
          for (item in data) {
            if (item !== 'description') {
              if (data[item] === undefined) {
                checker = false;
              } else if (data[item] === '') {
                checker = false;
              }
            }
          }
        }
        if (checker) {
          $http.get(appConfig.dashboardServiceUrl + this.url, {
            params: data
          }).then(function (res) {
            if (res.data.status === 'ok') {
              $window.location.href = '#!/thank-you' + inquiryType;
            }
          });
        }
      };
    }
  });
