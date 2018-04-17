angular
  .module('app')
  .component('dailyInsightsComponent', {
    templateUrl: 'app/components/daily-insights/daily-insights.tmpl.html',
    controller: function ($http, appConfig, modalService) {
      var vm = this;
      vm.pageData = {};
      vm.items = [];
      vm.allDailies = [];

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'dailies.json')
          .then(function (res) {
            if (res && res.data) {
              angular.forEach(res.data, function (item) {
                item.date = moment(item.published_year + '-' + item.published_month + '-' + item.published_day).format('dddd, MMMM D, YYYY');
                item.published_date = moment(item.published_year + '-' + item.published_month + '-' + item.published_day).format('YYYY-MM-DD');
              });
              vm.allDailies = _.sortBy(res.data, 'published_date').reverse();
              vm.emptyData = Boolean(vm.allDailies[0])
              vm.pageData = vm.allDailies.shift();
              vm.more();
            }
          });
      };

      vm.more = function () {
        vm.items = angular.copy(vm.allDailies.slice(0, vm.items.length + 3));
      };

      vm.onGraphicClick = function (item) {
        if (item) {
          modalService.showModal(3, null, item);
        }
      };
    }
  });
