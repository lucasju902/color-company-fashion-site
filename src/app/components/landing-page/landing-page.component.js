angular
  .module('app')
  .component('landingPageComponent', {
    templateUrl: 'app/components/landing-page/landing-page.tmpl.html',
    controller: function (authService, $scope, $state, localStorageService, $http, searchColor, dataValidate, appConfig, $window, $location, modalService,  colorRequest) {
    var vm =this;

      $(document).ready(function () {
        $("nav").find("li").on("click", "a", function () {
        });
				$scope.color_picker_y = $('#color_picker').offset().top;
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
              sact(2000);
          }

          function sact(it) {
              var currentSlide = $('.current');
              var nextSlide = currentSlide.next('.slideitem');
              var prevSlide = currentSlide.prev('.slideitem');

              if (nextSlide.length == 0) {
                  nextSlide = $('.slideitem').first();
              }

              if (prevSlide.length == 0) {
                  prevSlide = $('.slideitem').last();
              }

              var Slide = nextSlide;
              var it_before = it - 1500;
              currentSlide.stop(true , true).fadeOut(it_before).removeClass('current');
              Slide.stop(true , true).fadeIn(it).addClass('current');
          }
      });

//                                                                                                          REPORTS ON LANDING
			$http.get(appConfig.dashboardServiceUrl + 'reports/on_landing.json').then(function (res) {
				console.log("res", res.data.reports);
				vm.reports_on_landing = res.data.reports
			});

			console.log('$(.color-picker-landing_responsive', $('.color-picker-landing_responsive'));
			example = document.getElementById('color-picker-responsive-block');
			example.addEventListener('onresize', function(){
				console.log('color-picker-landing_responsive');
			});
			// $(window).resize(function(){
			// 	// sizeParamsOfColorPicker();
			// 	styleParentCP = window.getComputedStyle(document.getElementById('color-picker-responsive-block'));
			// 	styleTitleCP = window.getComputedStyle(document.getElementById('color-picker-title'));
			// 	styleHeader = window.getComputedStyle(document.getElementById('landing-header-slider-block'));
			// 	styleTextCP = window.getComputedStyle(document.getElementById('color-picker-page_text'));
			//
			// 	marginLeft = parseInt(styleParentCP.getPropertyValue('margin-left'), 10);
			// 	widthTitle = parseInt(styleTitleCP.getPropertyValue('width'), 10);
			// 	heightHeader = parseInt(styleHeader.getPropertyValue('height'), 10);
			// 	pageTextCP = parseInt(styleTextCP.getPropertyValue('height'), 10);
			// 	// console.log('heigthHeader', heightHeader)
			// 	// console.log('widthTitle', widthTitle)
			// 	// console.log('marginLeft', marginLeft)
			// });

        //																																			RESPONSIVE COLOR PICKER
        var styleParentCP = '',
					   styleTitleCP = '',
        	  	styleHeader = '',
					     marginLeft = '',
               widthTitle = '',
             heightHeader = '',
				    	styleTextCP = '',
					  	 pageTextCP = '';

        // function sizeParamsOfColorPicker () {

					styleParentCP = window.getComputedStyle(document.getElementById('color-picker-responsive-block'));
					styleTitleCP = window.getComputedStyle(document.getElementById('color-picker-title'));
					styleHeader = window.getComputedStyle(document.getElementById('landing-header-slider-block'));
					// styleTextCP = window.getComputedStyle(document.getElementById('color-picker-page_text'));

					marginLeft = parseInt(styleParentCP.getPropertyValue('margin-left'), 10);
					widthTitle = parseInt(styleTitleCP.getPropertyValue('width'), 10);
					heightHeader = parseInt(styleHeader.getPropertyValue('height'), 10);
					// pageTextCP = parseInt(styleTextCP.getPropertyValue('height'), 10);
					// console.log('heigthHeader', heightHeader)
					// console.log('widthTitle', widthTitle)
                    // console.log('marginLeft', marginLeft)
                    $scope.color_picker_x = marginLeft + widthTitle;
                    // $scope.color_picker_y = heightHeader + 3027;
				// }

        this.colorWordSearchLanding = function () {
					vm.RGB = [$scope.colorRGB_R, $scope.colorRGB_G, $scope.colorRGB_B];
					var colorAssociationName = '';
					// var str = [];
					var RGB = {'red': $scope.colorRGB_R, 'green': $scope.colorRGB_G, 'blue': $scope.colorRGB_B};

                    colorRequest.getRgb(RGB)
					.then(function(data){
                        if (data.rgb) {
                            vm.paintColorNames = data.short_name;
                            vm.validData = data;
                            	if (data && data.short_namecontains.length > 0) {
                            		vm.colorAssociationNames = data.short_namecontains;
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
