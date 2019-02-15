angular
  .module('app')
  .component('landingPageComponent', {
    templateUrl: 'app/components/landing-page/landing-page.tmpl.html',
    controller: function (authService, $scope, $state, localStorageService, $http, searchColor, dataValidate, appConfig, $window, $location) {
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
      });

//                                                                                                          REPORTS ON LANDING
			$http.get(appConfig.dashboardServiceUrl + 'reports/on_landing.json').then(function (res) {
				console.log("res", res.data.reports);
				vm.reports_on_landing = res.data.reports
			});

//                                                                                                          COLOR-PICKER
        var color_picker = document.getElementById("color_picker");
        var color_id = document.getElementById("color_id");
        $scope.colorPickerGray = 100;
        $scope.colorPickerOpacity = 1;
			  document.getElementById('value_span').innerHTML = '100%';

        $scope.changeColor = function () {
            color_picker.onmousedown = select_color;
        };
        color_picker_add();

        $scope.colorPickerSliderGray = function  () {
            var value = document.getElementById('rg').value;
            color_id.style.filter =  "saturate(" + value + "%)";
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

        function color_picker_add() {
            color_picker_ = color_picker.getContext("2d"),
                center_x = (color_picker.width)/2,
                center_y = (color_picker.height)/2,
                sx = center_x,
                sy = center_y;

            $scope.colorRGB_R = 0;
            $scope.colorRGB_G = 0;
            $scope.colorRGB_B = 0;
            palette = new color_picker_element(center_x, center_y, sx, sy);
            palette.draw();
        }

        function select_color(e) {
            var x = e.pageX - color_picker.offsetLeft - 534,
                y = e.pageY - color_picker.offsetTop - 3672,
                pixel = color_picker.getContext("2d").getImageData(x, y, 2, 2).data,
                pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", "+ pixel[2] + ")";
            color_id.style.backgroundColor = pixelColor;

            $scope.pixel = pixel;
            $scope.colorRGB_R = pixel[0];
            $scope.colorRGB_G = pixel[1];
            $scope.colorRGB_B = pixel[2];
            console.log('pixelColor _select_color', $scope);
            console.log('y  _select_color',y);
            console.log('x  _select_color',x);
        }
        function color_picker_element(center_x, center_y, sx, sy) {
            this.center_x = center_x;
            this.center_y = center_y;
            this.sx = sx;
            this.sy = sy;
            this.draw = function() {
                for(var i = 0; i < 360; i+=0.1) {
                    var rad = (i-45) * (Math.PI) / 180;
                    color_picker_.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";
                    color_picker_.beginPath();
                    color_picker_.moveTo(center_x, center_y);
                    color_picker_.lineTo(center_x + sx * Math.cos(-rad), center_y + sy * Math.sin(-rad));
                    color_picker_.stroke();
                }
            }
        }

        this.colorWordSearchLanding = function () {
					vm.RGB = [$scope.colorRGB_R, $scope.colorRGB_G, $scope.colorRGB_B];
					var colorAssociationName = '';
					// var str = [];
					var RGB = {'red': $scope.colorRGB_R, 'green': $scope.colorRGB_G, 'blue': $scope.colorRGB_B};

					$http.get(appConfig.dashboardServiceUrl + 'api_colors/search_rgb', {params: RGB})
						.then(function (res) {
							if (res.data.length > 0) {
								vm.paintColorNames = res.data.map(function (item) {
									RGB = item.Red + ', ' + item.Green + ', ' + item.Blue;
									colorName = item.ShortName;
									return {colorName: colorName, RGB: RGB};
								});

								// colorAssociationName = vm.paintColorNames[0].colorName.replace(' ', '%20');
								colorAssociationName = {'shortname': vm.paintColorNames[0].colorName.replace(' ', '%20')};
                //
								$http.get(appConfig.dashboardServiceUrl + 'api_colors/search_shortname', {params: colorAssociationName})
									.then(function (res) {
										vm.validData = res.data;
										if (res && res.data.length > 0) {
											var RGB = '',
												colorName = '';
											vm.colorAssociationNames = res.data.map(function (item) {
												RGB = item.Red + ', ' + item.Green + ', ' + item.Blue;
												colorName = item.ShortName;
												return {colorName: colorName, RGB: RGB};
											});
											searchColor.set(vm.paintColorNames, vm.colorAssociationNames);
											$location.url('/color-index-accordion');
										}
									});
							}
						});
        };
    }
  });
