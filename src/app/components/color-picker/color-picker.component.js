angular
	.module('app')
	.component('colorPickerComponent', {
		templateUrl: 'app/components/color-picker/color-picker.tmpl.html',
		controller: function ($location, $scope, $http, appConfig, anchorSmoothScroll, searchColor, modalService) {
			var vm = this;

			vm.gotoElement = function (eID) {
				$location.hash('prefooter');
				anchorSmoothScroll.scrollTo(eID);
				$location.hash('');
			};
			// vm.paintColorNamesByPicker = [];
			// vm.colorAssociationNamesByPicker = [];

			var color_picker = document.getElementById("color_picker"),
							color_id = document.getElementById("color_id");
			$scope.colorPickerGray = 100;
			$scope.colorPickerOpacity = 1;
			document.getElementById('value_span').innerHTML = '100%';

			vm.numOfpaintColorNames = 0;
			vm.numOfcolorAssociationNames = 0;
			vm.colorAssociationNameWord = '';

			$scope.changeColor = function () {
				color_picker.onmousedown = select_color;
			};

			color_picker_add();

			$scope.colorPickerSliderGray = function () {
				var value = document.getElementById('rg').value;
				color_id.style.filter = "saturate(" + value + "%)";
			};

			$scope.colorPickerSliderOpacity = function () {
				var value = document.getElementById('range_opacity').value;
				document.getElementById('value_span').innerHTML = value * 100 + '%';
				color_id.style.opacity = value;
			};

			$scope.colorPickerRGB = function () {
				var colorInputR = document.getElementById('colorInputR').value,
						colorInputG = document.getElementById('colorInputG').value,
						colorInputB = document.getElementById('colorInputB').value;

				$scope.colorRGB_R = colorInputR;
				$scope.colorRGB_G = colorInputG;
				$scope.colorRGB_B = colorInputB;

				var inputRGB = "rgb(" + $scope.colorRGB_R + ", " + $scope.colorRGB_G + ", " + $scope.colorRGB_B + ")";
				color_id.style.backgroundColor = inputRGB;
			}

			function color_picker_add() {
				color_picker_ = color_picker.getContext("2d"),
					center_x = (color_picker.width) / 2,
					center_y = (color_picker.height) / 2,
					sx = center_x,
					sy = center_y;

				$scope.colorRGB_R = 0;
				$scope.colorRGB_G = 0;
				$scope.colorRGB_B = 0;
				palette = new color_picker_element(center_x, center_y, sx, sy);
				palette.draw();
			}

			function select_color(e) {
				var x = e.pageX - color_picker.offsetLeft - 48,
						y = e.pageY - color_picker.offsetTop - 570,
						pixel = color_picker.getContext("2d").getImageData(x, y, 2, 2).data,
						// pixel1 = color_picker.getContext("2d").getImageData(x, y, 2, 2),
						pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
				color_id.style.backgroundColor = pixelColor;
				// console.log('xxx', x, 'yyy', y);
				// console.log('color_picker.offsetLeft', color_picker.offsetLeft, 'color_picker.offsetTop', color_picker.offsetTop);

				$scope.pixel = pixel;
				$scope.colorRGB_R = pixel[0];
				$scope.colorRGB_G = pixel[1];
				$scope.colorRGB_B = pixel[2];;
			}


			function color_picker_element(center_x, center_y, sx, sy) {
				this.center_x = center_x;
				this.center_y = center_y;
				this.sx = sx;
				this.sy = sy;
				this.draw = function () {
					for (var i = 0; i < 360; i += 0.1) {
						var rad = (i - 45) * (Math.PI) / 180;
						color_picker_.strokeStyle = "hsla(" + i + ", 100%, 50%, 1.0)";
						color_picker_.beginPath();
						color_picker_.moveTo(center_x, center_y);
						color_picker_.lineTo(center_x + sx * Math.cos(-rad), center_y + sy * Math.sin(-rad));
						color_picker_.stroke();
					}
				}
			}

			this.searchByRGB = function () {
				vm.RGB = [$scope.colorRGB_R, $scope.colorRGB_G, $scope.colorRGB_B];
				// $http.get(appConfig.colorAPI +
				// 	'minred=' + $scope.colorRGB_R +
				// 	'&maxred=' + $scope.colorRGB_R +
				// 	'&mingreen=' + $scope.colorRGB_G +
				// 	'&maxgreen=' + $scope.colorRGB_G +
				// 	'&minblue=' + $scope.colorRGB_B +
				// 	'&maxblue=' + $scope.colorRGB_B, {})
				// 	.then(function (res) {
				// 		if (res.data.length > 0) {
				// 			vm.paintColorNamesByPicker = res.data.map(function (item) {
				// 				RGB = item.Red + ', ' + item.Green + ', ' + item.Blue;
				// 				colorName = item.ShortName;
				// 				return {colorName: colorName, RGB: RGB};
				// 			});
				// 			if (vm.paintColorNamesByPicker) {
				// 				vm.colorAssociationNameWord = vm.paintColorNamesByPicker[0].colorName.replace(' ', '%20');
				// 			}
				//
				// 			$http.get(appConfig.colorAPI + 'shortnamecontains=' + vm.colorAssociationNameWord, {})
				// 				.then(function (res) {
				// 					vm.numOfcolorAssociationNames = res.data.length;
				// 					vm.numOfpaintColorNames = vm.paintColorNamesByPicker.length;
				// 				});
				// 		}
				// 	});
				var RGB = {'red': $scope.colorRGB_R, 'green': $scope.colorRGB_G, 'blue': $scope.colorRGB_B};

				$http.get(appConfig.dashboardServiceUrl + 'api_colors/search_rgb', {params: RGB})
					.then(function (res) {
						if (res.data.rgb) {
							vm.paintColorNamesByPicker = res.data.rgb.map(function (item) {
								RGB = item.RGB;
								colorName = item.colorName;
								return {colorName: colorName, RGB: RGB};
							});
							vm.validData = res.data;
							vm.numOfcolorAssociationNames = res.data.short_namecontains.length;
							vm.numOfpaintColorNames = vm.paintColorNamesByPicker.length;
						} else {
							modalService.showModal(5);
						}
					});
			};

			this.searchByShortNames = function () {
				if(vm.validData && vm.validData.short_namecontains.length > 0) {
					var RGB = '',
						colorName = '';
						vm.colorAssociationNamesByPicker = vm.validData.short_namecontains.map(function (item) {
							RGB = item.RGB;
							colorName = item.colorName;
							return {colorName: colorName, RGB: RGB};
						});
						searchColor.set(vm.paintColorNamesByPicker, vm.colorAssociationNamesByPicker);
						$location.url('/color-index-accordion');
				}
			};

			$(document).ready(function () {
				$(".scroll_down").click(function () {
					$('html, body').animate({
						scrollTop: $(".scroll-end").offset().top
					}, 1500);
				});
			});

		}
	});
