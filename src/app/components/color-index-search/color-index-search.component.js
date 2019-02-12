angular
  .module('app')
  .component('colorIndexSearchComponent', {
    templateUrl: 'app/components/color-index-search/color-index-search.tmpl.html',
    controller: function (dataValidate, appConfig, $window, $location, anchorSmoothScroll, $http, $scope, searchColor) {
      var vm = this;
      vm.colorsData = {};

        this.colorSearch = function () {
							$http.get(appConfig.colorAPI + 'shortnamecontains=' + this.data.color, {})
								.then(function (res) {
								vm.validData = res.data;
								if (res && res.data.length > 0) {
									var RGB = '',
											colorName = '';
									vm.colorsData = res.data.map(function (item) {
										RGB = item.Red + ', ' + item.Green + ', ' + item.Blue;
										colorName = item.ShortName;
										return {colorName: colorName, RGB: RGB};
									});
									searchColor.set(vm.colorsData);
									$location.url('/color-index-accordion');
								}
							});
        };
    }
  });
