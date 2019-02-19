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

			var color_picker = document.getElementById('color_picker'),
							color_id = document.getElementById('color_id');
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
				var value = document.getElementById('rg').value,
					inputRGB = [$scope.colorRGB_R, $scope.colorRGB_G, $scope.colorRGB_B],
					hsl = rgb2hsl(inputRGB);

				color_id.style.background = 'hsl(' + hsl[0] + ',' + value + '%,' + hsl[2] + '%';
				var rgbArr = color_id.style.background.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

				$scope.colorRGB_R = rgbArr[1];
				$scope.colorRGB_G = rgbArr[2];
				$scope.colorRGB_B = rgbArr[3];
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

				var inputRGB = 'rgb(' + $scope.colorRGB_R + ', ' + $scope.colorRGB_G + ', ' + $scope.colorRGB_B + ')';
				color_id.style.backgroundColor = inputRGB;
			};

			function color_picker_add() {
				color_picker_ = color_picker.getContext('2d'),
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
				// console.log('e.pageX', e.pageX);
				// console.log('e.pageY', e.pageY);
				var x = e.pageX - color_picker.offsetLeft - 48,
					y = e.pageY - color_picker.offsetTop - 550,
					pixel = color_picker.getContext('2d').getImageData(x, y, 2, 2).data,
					// pixel1 = color_picker.getContext("2d").getImageData(x, y, 2, 2),
					pixelColor = 'rgb(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ')';
				color_id.style.backgroundColor = pixelColor;
				// console.log('color_picker', color_picker);
				// console.log('xxx', x, 'yyy', y);
				// console.log('color_picker.offsetLeft', color_picker.offsetLeft, 'color_picker.offsetTop', color_picker.offsetTop);

				$scope.pixel = pixel;
				$scope.colorRGB_R = pixel[0];
				$scope.colorRGB_G = pixel[1];
				$scope.colorRGB_B = pixel[2];
			}

			function color_picker_element(center_x, center_y, sx, sy) {
				this.center_x = center_x;
				this.center_y = center_y;
				this.sx = sx;
				this.sy = sy;
				this.draw = function () {
					for (var i = 0; i < 360; i += 0.1) {
						var rad = (i - 45) * (Math.PI) / 180;
						color_picker_.strokeStyle = 'hsla(' + i + ', 100%, 50%, 1.0)';
						color_picker_.beginPath();
						color_picker_.moveTo(center_x, center_y);
						color_picker_.lineTo(center_x + sx * Math.cos(-rad), center_y + sy * Math.sin(-rad));
						color_picker_.stroke();
					}
				};
			}

			this.searchByRGB = function () {
				vm.RGB = [$scope.colorRGB_R, $scope.colorRGB_G, $scope.colorRGB_B];

				var RGB = {red: $scope.colorRGB_R, green: $scope.colorRGB_G, blue: $scope.colorRGB_B};

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
			// RGB to HSL																																																		RGB_TO_HSL
			function rgb2hsl(rgbArr) {
				var r1 = rgbArr[0] / 255;
				var g1 = rgbArr[1] / 255;
				var b1 = rgbArr[2] / 255;

				var maxColor = Math.max(r1, g1, b1);
				var minColor = Math.min(r1, g1, b1);
				// Calculate L:
				var L = (maxColor + minColor) / 2;
				var S = 0;
				var H = 0;
				if (maxColor != minColor) {
					// Calculate S:
					if (L < 0.5) {
						S = (maxColor - minColor) / (maxColor + minColor);
					} else {
						S = (maxColor - minColor) / (2.0 - maxColor - minColor);
					}
					// Calculate H:
					if (r1 == maxColor) {
						H = (g1 - b1) / (maxColor - minColor);
					} else if (g1 == maxColor) {
						H = 2.0 + (b1 - r1) / (maxColor - minColor);
					} else {
						H = 4.0 + (r1 - g1) / (maxColor - minColor);
					}
				}

				L *= 100;
				S *= 100;
				H *= 60;
				if (H < 0) {
					H += 360;
				}
				var result = [H, S, L];
				return result;
			}

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
				$('.scroll_down').click(function () {
					$('html, body').animate({
						scrollTop: $('.scroll-end').offset().top
					}, 1500);
				});
			});
		}
	});
