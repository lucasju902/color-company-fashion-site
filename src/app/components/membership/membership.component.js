angular
  .module('app')
  .component('membershipComponent', {
    templateUrl: 'app/components/membership/membership.tmpl.html',
    controller: function ($window, $stateParams, $state, scrollService, categoryValues, $http, appConfig) {
      scrollService.scrollMember()
      this.permissions = {
        'Daily Insights': false,
        'Research Partner': false,
        'Education Offerings': false
      };
      this.relationship = {
        'Expert Panelist': false
      };
      this.jobs = categoryValues('job function');
      this.countries = categoryValues('country');
      this.industries = categoryValues('industry');
      this.compamySizes = categoryValues('company size');
      this.country = '';
      this.industry = ''
      this.compamySize = '';
      this.jobTitle = '';
      this.jobFunction = '';
      this.company = '';
      this.email = '';
      this.lastName = '';
      this.firstName = '';

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
    }
  });
