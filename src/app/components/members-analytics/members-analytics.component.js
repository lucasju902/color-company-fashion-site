angular
  .module('app')
  .component('membersAnalyticsComponent', {
    templateUrl: 'app/components/members-analytics/members-analytics.tmpl.html',
    controller: function ($http, appConfig) {
      var vm = this;
      vm.searchModel = '';
      vm.all = [];
      vm.items = [];
      vm.pageData = [];

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + '/member_analytics.json')
          .then(function (res) {
            vm.pageData = angular.copy(res.data.data);
            vm.all = angular.copy(res.data.data);
            vm.more();
          });
      };
      vm.more = function () {
        vm.items = angular.copy(vm.pageData.slice(0, vm.items.length + 6));
      };

      vm.search = function () {
        if (vm.searchModel) {
          vm.pageData = [];
          vm.all.forEach(function (t) {
            if (new RegExp('^' + vm.searchModel, 'i').test(t.member_name)) {
              vm.pageData.push(t);
            }
          });
        } else {
          vm.pageData = angular.copy(vm.all);
        }
        vm.items = [];
        vm.more();
      };
    }
  });
