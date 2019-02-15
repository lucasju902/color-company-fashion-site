angular
	.module('app')
	.component('colorIndexSearchComponent', {
		templateUrl: 'app/components/color-index-search/color-index-search.tmpl.html',
		controller: function (dataValidate, appConfig, $window, $location, anchorSmoothScroll, $http, $scope, searchColor) {
			var vm = this;
			vm.paintColorNamesData = [];
			vm.colorAssociationNames = [];

			this.colorSearch = function () {
				if (this.data.color != ' ') {
					$http.get(appConfig.dashboardServiceUrl + 'api_colors/search_shortname', {
						params: {shortname: vm.data.color}
					})
						.then(function (res) {
							vm.colorValidDataShort = res.data;
							if (res && res.data.length > 0) {
								var RGB = '',
									colorName = '';
								vm.paintColorNamesData = res.data.map(function (item) {
									RGB = item.Red + ', ' + item.Green + ', ' + item.Blue;
									colorName = item.ShortName;
									return {colorName: colorName, RGB: RGB};
								});
								$http.get(appConfig.dashboardServiceUrl + 'api_colors/search_shortnamecontains', {
									params: {shortname: vm.data.color}
								})
									.then(function (res) {
										if (res && res.data.length > 0) {
											var RGB = '',
												colorName = '';
											vm.colorAssociationNames = res.data.map(function (item) {
												RGB = item.Red + ', ' + item.Green + ', ' + item.Blue;
												colorName = item.ShortName;
												return {colorName: colorName, RGB: RGB};
											});
											searchColor.set(vm.paintColorNamesData, vm.colorAssociationNames);
											$location.url('/color-index-accordion');
										}
									});
							}
						});
				}
			};
		}
	});
