angular
	.module('app')
	.component('colorPickerComponent', {
		templateUrl: 'app/components/color-picker/color-picker.tmpl.html',
		controller: function ($location, $scope, $http, appConfig, anchorSmoothScroll, searchColor, modalService, colorRequest) {
			var vm = this;

			vm.gotoElement = function (eID) {
				$location.hash('prefooter');
				anchorSmoothScroll.scrollTo(eID);
				$location.hash('');
			};
			vm.numOfpaintColorNames = 0;
			vm.numOfcolorAssociationNames = 0;
			vm.colorAssociationNameWord = '';
			
			var styleTextCP = window.getComputedStyle(document.getElementById('color-picker-page_text')),
				pageTextCP = '';
			pageTextCP = parseInt(styleTextCP.getPropertyValue('height'), 10);
			$scope.color_picker_x = 48;
			$scope.color_picker_y = 510 + pageTextCP;

			this.searchByRGB = function () {
				var RGB = {red: $scope.colorRGB_R, green: $scope.colorRGB_G, blue: $scope.colorRGB_B};

				colorRequest.getRgb(RGB)
					.then(function(data){
						if (data.rgb) {
							vm.paintColorNamesByPicker = data.short_name;
							vm.validData = data;
							vm.numOfcolorAssociationNames = data.short_namecontains.length;
							vm.numOfpaintColorNames = data.short_name.length;
						} else {
							modalService.showModal(5);
						}
				});
			};

			this.searchByShortNames = function () {
				if(vm.validData && vm.validData.short_namecontains.length > 0) {
						vm.colorAssociationNamesByPicker = vm.validData.short_namecontains;
						searchColor.set(vm.paintColorNamesByPicker, vm.colorAssociationNamesByPicker);
						$location.url('/color-index-accordion');
				}
			};

			$(document).ready(function () {
				$('.scroll_down').click(function () {
					$('html, body').animate({
						scrollTop: $('.scroll-end').offset().top
					}, 1500);
				});
			});
		}
	});
