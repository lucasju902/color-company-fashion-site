angular
  .module('app')
  .component('dailyInsightsComponent', {
    templateUrl: 'app/components/daily-insights/daily-insights.tmpl.html',
    controller: function ($http, appConfig) {
      var vm = this;
      vm.pageData = {};

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'dailies.json')
          .then(function (res) {
            if (res && res.data) {
              vm.emptyData = Boolean(res.data.id);
              vm.pageData = res.data;
              vm.pageData.date = moment(vm.pageData.published_year+'-'+vm.pageData.published_month+'-'+vm.pageData.published_day).format('dddd, MMMM D, YYYY');
            }
          });
      };
    }
  });
