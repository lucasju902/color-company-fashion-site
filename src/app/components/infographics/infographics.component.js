angular
  .module('app')
  .component('infographicsComponent', {
    templateUrl: 'app/components/infographics/infographics.tmpl.html',
    controller: function ($http, appConfig, modalService) {
      var vm = this;
      vm.hueModel = 'VERTICAL';
      vm.yearModel = 'YEAR';
      vm.year = [];
      vm.hue = [];
      vm.items = [];
      vm.pageData = {};
      var lastYear = moment().year();

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'infographics.json')
          .then(function (res) {
            if (res && res.data) {
              vm.pageData = res.data.data.map(function (item) {
                var b = res.data.picture.find(function (a) {
                  return a.infographic_id === item.id;
                });
                if (b) {
                  item.image_url = b.image_url;
                }
                return item;
              });
              vm.year.push(moment().format('YYYY'));
              vm.pageData.map(function (t) {
                t.date = moment(t.published_year + '-' + t.published_month + '-' + t.published_day).format(' MMMM D, YYYY');
              });
              vm.pageData.forEach(function (t) {
                if (Number(t.published_year) && Number(t.published_year) < lastYear) {
                  lastYear = Number(t.published_year);
                }
              });
              vm.year = _.range(lastYear, moment().year() + 1);
              vm.hue = ['Fashion', 'Brand', 'Auto', 'Fragrance', 'Interior', 'Legal', 'Paint', 'Pharmaceuticals'];
              vm.select();
            }
          });
      };
      vm.more = function () {
        vm.items = angular.copy(vm.filterDate.slice(0, vm.items.length + 3));
      };

      vm.onGraphicClick = function (event) {
       if(event) {
         modalService.showModal(2, event);
       }
      };

      vm.select = function () {
        if (vm.hue.includes(vm.hueModel) || vm.year.includes(vm.yearModel)) {
          vm.filterDate = angular.copy(vm.pageData.filter(function (t) {
            if ((!vm.hue.includes(vm.hueModel) || vm.hueModel === t.hue) &&
              (!vm.year.includes(vm.yearModel) || vm.yearModel === t.published_year)) {
              return t;
            }
          }));
        } else {
          vm.filterDate = angular.copy(vm.pageData);
        }
        vm.items = [];
        vm.more();
      };
    }
  });
