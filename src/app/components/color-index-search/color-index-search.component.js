angular
  .module('app')
  .component('colorIndexSearchComponent', {
    templateUrl: 'app/components/color-index-search/color-index-search.tmpl.html',
    controller: function (dataValidate, appConfig, $window, $location, anchorSmoothScroll, $http, $scope, searchColor) {
      var vm = this;
      vm.colorData = {};

        this.colorSearch = function () {
            if (dataValidate.validate(vm.data)) {
                var colorWithNum = parseInt(vm.data.color.replace(/[^0-9\.]/g, ''), 10);
                // console.log("colorWithNum", colorWithNum);
                // console.log("colorWithNum", isNaN(colorWithNum))
                // console.log("vm.data.color", vm.data.color)
                // console.log("colorWithNum", colorWithNum.toString().length );
                if (isNaN(!colorWithNum) || colorWithNum) {
                    var regex = /[\d|,|.| |e|E|\+]+/g;
                    vm.data.color = vm.data.color.match(regex);
                    // console.log("matches", vm.data.color);
                    vm.data = {rgb: vm.data.color};
                    // console.log("vm.data", vm.data);
                } else {
                    delete vm.data['rgb'];
                }
                $http.get(appConfig.dashboardServiceUrl + 'colors/search.json', {
                    params: vm.data
                }).then(function (res) {
                    if (res && res.data) {
                        vm.colorData = res.data.data.map(function (item) {
                            colors = item.data;
                            return item.data;
                        });
                        searchColor.set(vm.colorData);
                        $location.url('/color-index-accordion');
                        // console.log("colorDatacolorDatacolorData", vm.colorData);
                    }
                });
            }

        };

            // $http.get(appConfig.dashboardServiceUrl + 'colors/index.json')
            //     .then(function (res) {
            //         console.log('res',res);
            //         vm.pageData = res;
            //     }).catch(function (err) {
            //     if (err) {
            //         console.log('err',err);
            //     }
            // });
    }
  });
