angular
  .module('app')
  .component('goodReadsComponent', {
    templateUrl: 'app/components/good-reads/good-reads.tmpl.html',
    controller: function ($http, appConfig) {
      var vm = this;

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'good_reads.json')
          .then(function (res) {
            if (res && res.data && res.data.data) {
              vm.pageData = res.data.data.map(function (item) {
                item.data.image_url = item.images && item.images[0] && item.images[0].image_url;
                return item.data;
              });
            }
            vm.groups = _.chunk(angular.copy(vm.pageData), 3);
          });
      };
    }
  });
