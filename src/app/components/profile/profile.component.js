angular
  .module('app')
  .component('profileComponent', {
    templateUrl: 'app/components/profile/profile.tmpl.html',
    controller: function ($http, appConfig, $stateParams) {
      var vm = this;
      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'members/' + $stateParams.id + '.json')
          .then(function (res) {
            if (res && res.data) {
              vm.data = res.data;
              vm.date = vm.data.date_day + ' : ' + vm.data.date_month + ' : ' + vm.data.date_year;
              vm.img_url = vm.data.image_file_name || 'http://s3.amazonaws.com/hue-storage/huegroup-website/about_vertical_coverages/image1s/000/000/001/original/HG_REPORT-V1-image.001.jpeg?1523632810'
            }
          });
      };
    }
  });
