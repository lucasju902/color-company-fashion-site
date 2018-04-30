angular
  .module('app')
  .component('pressComponent', {
    templateUrl: 'app/components/press/press.tmpl.html',
    controller: function ($window, $http, appConfig, dataValidate) {
      var vm = this;
      vm.research = '-';
      vm.pageData = {};
      vm.data = {
        firstName: {value: '', required: true, name: 'first name', type: 'provide'},
        lastName: {value: '', required: true, name: 'last name', type: 'provide'},
        email: {value: '', required: true, name: 'email', type: 'provide'},
        company: {value: '', required: true, name: 'company name', type: 'provide'},
        message: {value: '', required: true, name: 'message', type: 'enter'}
      };

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
        if (dataValidate.validate(vm.data)) {
          var data = {};
          for (var item in this.data) {
            data[item] = this.data[item].value;
          }
          data.research = vm.research;
          $http.get(appConfig.dashboardServiceUrl + 'press_contact', {
            params: data
          })
            .then(function (res) {
              if (res.data.status === 'ok') {
                $window.location.href = '#!/thank-youpress';
              }
            });
        }
      };
      vm.makeDate = function (item) {
        return moment(item.data.published_year + '-' + item.data.published_month + '-' + item.data.published_day).format('MMMM D, YYYY');
      };
    }
  });
