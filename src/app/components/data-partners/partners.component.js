angular
  .module('app')
  .component('partnersComponent', {
    templateUrl: 'app/components/data-partners/partners.tmpl.html',
    controller: function ($http, appConfig) {
      var vm = this;

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'top_data_partners.json')
          .then(function (res) {
            if (res && res.data) {
              vm.pageData = res.data;
            }
          });
      };
    }
  });
