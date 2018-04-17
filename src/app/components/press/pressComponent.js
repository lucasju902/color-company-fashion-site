angular
  .module('app')
  .component('pressComponent', {
    templateUrl: 'app/components/press/press.tmpl.html',
    controller: function ($http, appConfig) {
      var vm = this;
      vm.firstName = '';
      vm.lastName = '';
      vm.email = '';
      vm.company = '';
      vm.message = '';
      vm.research = '-';
      vm.pageData = {};

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'presses.json')
          .then(function (res) {
            if (res && res.data && res.data.data) {
              vm.pageData = angular.copy(res.data);
            }
          });
        $http.get(appConfig.dashboardServiceUrl + 'reports.json')
          .then(function (res) {
            if (res && res.data) {
              vm.pageData.reports = angular.copy(res.data.data);
            }
          });
      };
      vm.press = function () {
        const user = {
          firstName: vm.firstName,
          lastName: vm.lastName,
          company: vm.company,
          email: vm.email,
          message: vm.message,
          research: vm.research
        };
        $http.get(appConfig.dashboardServiceUrl + 'press_contact', {
          params: user
        })
          .then(function (res) {
          });
      };
      vm.makeDate = function (item) {
        return moment(item.data.published_year+'-'+item.data.published_month+'-'+item.data.published_day).format('MMMM D, YYYY')
      }
    }
  });
