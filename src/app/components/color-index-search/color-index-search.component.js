angular
  .module('app')
  .component('colorIndexSearchComponent', {
    templateUrl: 'app/components/color-index-search/color-index-search.tmpl.html',
    controller: function (dataValidate, appConfig, anchorSmoothScroll, $http) {
      var vm = this;
      vm.colorData = {};

        this.colorSearch = function () {
            if (dataValidate.validate(vm.data)) {
                // console.log("this.data", vm.data);
                let colorWithNum = parseInt(vm.data.color.replace(/[^0-9\.]/g, ''), 10);
                // console.log("colorWithNum", colorWithNum)
                // console.log("colorWithNum", isNaN(colorWithNum))
                // console.log("vm.data.color", vm.data.color)
                // console.log("colorWithNum", colorWithNum.toString().length );


                if (isNaN(!colorWithNum) || colorWithNum) {
                    // console.log("vm.data.color", vm.data.color)
                    vm.data = {hex: vm.data.color};
                    // console.log("if (hexColor.toString().length === 6) vm.data", vm.data);
                } else if (colorWithNum.toString().length === 9) {

                } else {
                    delete vm.data['hex']
                    // console.log("elseelseelseelse", vm.data);
                }
                $http.get(appConfig.dashboardServiceUrl + 'colors/find.json', {
                    params: vm.data
                }).then(function (res) {
                    if (res && res.data) {
                        vm.colorData = res.data.data.map(function (item) {
                            item = item.data.hex;
                            return item;
                        });
                        // console.log("pageData", vm.colorData);
                    }
                    // if (res.status === 200) {
                    //     $state.go('thank-you');
                    // }
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

        // console.log(vm);
    }
  });
