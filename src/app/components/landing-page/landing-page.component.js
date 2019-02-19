angular
  .module('app')
  .component('landingPageComponent', {
    templateUrl: 'app/components/landing-page/landing-page.tmpl.html',
    controller: function (authService, $scope, $state, localStorageService, $http, searchColor, dataValidate, appConfig, $window, $location, modalService) {
    var vm =this;

      $(document).ready(function () {
        $("nav").find("li").on("click", "a", function () {
          // $('.navbar-collapse.in').collapse('hide');
        });
      });

      $(document).ready(function(){

        $("#slideshow > div:gt(0)").hide();

        var interval = setInterval(slide, 3000);

        function intslide(func) {
          if (func == 'start') {
            interval = setInterval(slide, 3000);
          } else {
            clearInterval(interval);
          }
        }

          function slide() {
              sact('next', 0, 2000);
          }

          function sact(a, ix, it) {
              var currentSlide = $('.current');
              var nextSlide = currentSlide.next('.slideitem');
              var prevSlide = currentSlide.prev('.slideitem');
              var reqSlide = $('.slideitem').eq(ix);

              var currentDot = $('.active-dot');
              var nextDot = currentDot.next();
              var prevDot = currentDot.prev();
              var reqDot = $('.dot').eq(ix);

              if (nextSlide.length == 0) {
                  nextDot = $('.dot').first();
                  nextSlide = $('.slideitem').first();
              }

              if (prevSlide.length == 0) {
                  prevDot = $('.dot').last();
                  prevSlide = $('.slideitem').last();
              }

              if (a == 'next') {
                  var Slide = nextSlide;
                  var Dot = nextDot;
              }
              else if (a == 'prev') {
                  var Slide = prevSlide;
                  var Dot = prevDot;
              }
              else {
                  var Slide = reqSlide;
                  var Dot = reqDot;
              }
              var it_before = it - 1500;
              currentSlide.fadeOut(it_before).removeClass('current');
              Slide.fadeIn(it).addClass('current');
          }
          sizeParamsOfColorPicker();
      });

//                                                                                                          REPORTS ON LANDING
			$http.get(appConfig.dashboardServiceUrl + 'reports/on_landing.json').then(function (res) {
				console.log("res", res.data.reports);
				vm.reports_on_landing = res.data.reports
			});

//                                                                                                          COLOR-PICKER
        var color_picker_landing = document.getElementById("color_picker_landing");
        var color_id = document.getElementById("color_id");
        $scope.colorPickerGray = 100;
        $scope.colorPickerOpacity = 1;
			  document.getElementById('value_span').innerHTML = '100%';

        $scope.changeColorLanding = function () {
            color_picker_landing.onmousedown = select_color;
        };
        color_picker_landing_add();

        $scope.colorPickerSliderGray = function  () {
					var value = document.getElementById('rg').value,
						inputRGB = [$scope.colorRGB_R, $scope.colorRGB_G, $scope.colorRGB_B],
						hsl = rgb2hsl(inputRGB);

					color_id.style.background = 'hsl(' + hsl[0] + ',' + value + '%,' + hsl[2] + '%';
					var rgbArr = color_id.style.background.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

					$scope.colorRGB_R = rgbArr[1];
					$scope.colorRGB_G = rgbArr[2];
					$scope.colorRGB_B = rgbArr[3];
        };

        $scope.colorPickerSliderOpacity = function  () {
            var value = document.getElementById('range_opacity').value;
            document.getElementById('value_span').innerHTML = value*100 + '%';
            color_id.style.opacity =  value;
        };

        $scope.colorPickerRGB = function () {
            var colorInputR = document.getElementById('colorInputR').value;
            var colorInputG = document.getElementById('colorInputG').value;
            var colorInputB = document.getElementById('colorInputB').value;

            $scope.colorRGB_R = colorInputR;
            $scope.colorRGB_G = colorInputG;
            $scope.colorRGB_B = colorInputB;

            var inputRGB = "rgb(" + $scope.colorRGB_R + ", " + $scope.colorRGB_G +", "+ $scope.colorRGB_B + ")";
            color_id.style.backgroundColor = inputRGB;
        };

        function color_picker_landing_add() {
            color_picker_landing_ = color_picker_landing.getContext("2d"),
                center_x = (color_picker_landing.width)/2,
                center_y = (color_picker_landing.height)/2,
                sx = center_x,
                sy = center_y;

            $scope.colorRGB_R = 0;
            $scope.colorRGB_G = 0;
            $scope.colorRGB_B = 0;
            palette = new color_picker_landing_element(center_x, center_y, sx, sy);
            palette.draw();
        }

			$(window).resize(function(){
				sizeParamsOfColorPicker();
				styleParentCP = window.getComputedStyle(document.getElementById('color-picker-responsive-block'));
				styleTitleCP = window.getComputedStyle(document.getElementById('color-picker-title'));
				styleHeader = window.getComputedStyle(document.getElementById('landing-header-slider-block'));
				marginLeft = parseInt(styleParentCP.getPropertyValue('margin-left'), 10);
				widthTitle = parseInt(styleTitleCP.getPropertyValue('width'), 10);
				heightHeader = parseInt(styleHeader.getPropertyValue('height'), 10);
				// console.log('heigthHeader', heightHeader)
				// console.log('widthTitle', widthTitle)
				// console.log('marginLeft', marginLeft)
			});

        //																																			RESPONSIVE COLOR PICKER
        var styleParentCP = '',
					   styleTitleCP = '',
        	  	styleHeader = '',
					     marginLeft = '',
               widthTitle = '',
             heightHeader = '';

        function sizeParamsOfColorPicker () {
					styleParentCP = window.getComputedStyle(document.getElementById('color-picker-responsive-block'));
					styleTitleCP = window.getComputedStyle(document.getElementById('color-picker-title'));
					styleHeader = window.getComputedStyle(document.getElementById('landing-header-slider-block'));
					marginLeft = parseInt(styleParentCP.getPropertyValue('margin-left'), 10);
					widthTitle = parseInt(styleTitleCP.getPropertyValue('width'), 10);
					heightHeader = parseInt(styleHeader.getPropertyValue('height'), 10);
				}

			function select_color(e) {
            var x = e.pageX - marginLeft - widthTitle - color_picker_landing.offsetLeft,
                y = e.pageY - color_picker_landing.offsetTop - heightHeader - 2980,
                pixel = color_picker_landing.getContext("2d").getImageData(x, y, 2, 2).data,
                pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", "+ pixel[2] + ")";
            color_id.style.backgroundColor = pixelColor;

            $scope.pixel = pixel;
            $scope.colorRGB_R = pixel[0];
            $scope.colorRGB_G = pixel[1];
            $scope.colorRGB_B = pixel[2];
					// console.log('e.pageX', e.pageX);
					// console.log('e.pageY', e.pageY);
					// console.log('xxx', x, 'yyy', y);
					// console.log('color_picker_landing.offsetLeft', color_picker_landing.offsetLeft, 'color_picker_landing.offsetTop', color_picker_landing.offsetTop);
				}
        function color_picker_landing_element(center_x, center_y, sx, sy) {
            this.center_x = center_x;
            this.center_y = center_y;
            this.sx = sx;
            this.sy = sy;
            this.draw = function() {
                for(var i = 0; i < 360; i+=0.1) {
                    var rad = (i-45) * (Math.PI) / 180;
                    color_picker_landing_.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";
                    color_picker_landing_.beginPath();
                    color_picker_landing_.moveTo(center_x, center_y);
                    color_picker_landing_.lineTo(center_x + sx * Math.cos(-rad), center_y + sy * Math.sin(-rad));
                    color_picker_landing_.stroke();
                }
            }
        }

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

        this.colorWordSearchLanding = function () {
					vm.RGB = [$scope.colorRGB_R, $scope.colorRGB_G, $scope.colorRGB_B];
					var colorAssociationName = '';
					// var str = [];
					var RGB = {'red': $scope.colorRGB_R, 'green': $scope.colorRGB_G, 'blue': $scope.colorRGB_B};

					$http.get(appConfig.dashboardServiceUrl + 'api_colors/search_rgb', {params: RGB})
						.then(function (res) {
							if (res.data.rgb) {
								vm.paintColorNames = res.data.rgb.map(function (item) {
									RGB = item.RGB;
									colorName = item.colorName;
									return {colorName: colorName, RGB: RGB};
								});
								vm.validData = res.data;
								if (res && res.data.short_namecontains.length > 0) {
									var RGB = '',
									colorName = '';
									vm.colorAssociationNames = res.data.short_namecontains.map(function (item) {
										RGB = item.RGB;
										colorName = item.colorName;
										return {colorName: colorName, RGB: RGB};
									});
									searchColor.set(vm.paintColorNames, vm.colorAssociationNames);
									$location.url('/color-index-accordion');
								}
							} else {
                                modalService.showModal(5);
                            }
						});
        };
    }
  });
