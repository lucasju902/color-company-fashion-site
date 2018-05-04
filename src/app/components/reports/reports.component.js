angular
  .module('app')
  .component('reportsComponent', {
    templateUrl: 'app/components/reports/reports.tmpl.html',
    controller: function ($http, appConfig, categoryValues) {
      var vm = this;
      vm.filters = {};
      vm.hueModel = 'VERTICALS';
      vm.reportModel = 'ALL';
      vm.yearModel = 'YEAR';
      vm.pageData = {};
      vm.cacheItems = [];
      vm.hue = categoryValues('hue');

      vm.report = ['CATEGORY', 'CITY', 'COLOR', 'DESIGNER', 'REGION', 'SEASON', 'YEAR'];
      vm.year = [];
      vm.items = [];
      vm.dis = true;
      var lastYear = moment().year();
      var count = 0;

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'reports.json')
          .then(function (res) {
            if (res && res.data && res.data.data) {
              vm.pageData = res.data.data.map(function (item) {
                item.data.date = moment(item.data.published_year + '-' + item.data.published_month + '-' + item.data.published_day, 'YYYY-MM-DD').format('MMMM D, YYYY');
                item.data.image_url = item.images && item.images[0] && item.images[0].image_url;
                vm.cacheItems.push(angular.copy(item.data));
                return item.data;
              });
              vm.pageData.forEach(function (t) {
                if (t.hue && !vm.hue.includes(t.hue)) {
                  vm.hue.push(t.hue);
                }

                if (Number(t.published_year) && Number(t.published_year) < lastYear) {
                  lastYear = Number(t.published_year);
                }
              });
              vm.year = _.range(lastYear, moment().year() + 1);
              vm.select();
              vm.year = vm.year.reverse();
            }
          });
      };

      vm.more = function () {
        vm.groups.push(vm.all[count++]);
      };

      vm.select = function (obj) {
        if (obj) {
          if (obj.$ctrl.hueModel === 'Fashion') {
            vm.dis = false;
          } else {
            vm.dis = true;
          }
        }
        vm.groups = [];
        if (vm.hue.includes(vm.hueModel) || vm.report.includes(vm.reportModel) || vm.year.includes(Number(vm.yearModel))) {
          vm.filterData = angular.copy(vm.cacheItems).filter(function (t) {
            if ((!vm.hue.includes(vm.hueModel) || vm.hueModel === t.hue) &&
              (!vm.report.includes(vm.reportModel) || vm.reportModel === t.report_style) &&
              (!vm.year.includes(Number(vm.yearModel)) || vm.yearModel === t.published_year)) {
              return t;
            }
          });
        } else {
          vm.filterData = angular.copy(vm.cacheItems);
        }
        vm.all = _.chunk(angular.copy(vm.filterData), 3);
        count = 0;
        vm.more();
      };
    }
  });
