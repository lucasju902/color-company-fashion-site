angular
  .module('app')
  .component('colorPickerComponent', {
    templateUrl: 'app/components/color-picker/color-picker.tmpl.html',
    controller: function ($location, $scope, anchorSmoothScroll) {
      var vm = this;

      vm.gotoElement = function (eID) {
        $location.hash('prefooter');
        anchorSmoothScroll.scrollTo(eID);
        $location.hash('');
      };
        $scope.dataa = 'weqwewqeqweqwewqe';

        // $scope.clickPicker = function () {
        //     console.log('$scope', $scope);
        // };
      // function clickPicker($scope) {
      //     $scope.dataaaa = '123';
      //     console.log('$scope', $scope);
      // }

      // vm.getUser = function () {
      //     return localStorageService.get('currentUser').id === undefined;
      // };

        $scope.color = '#FF0000';

// options - if a list is given then choose one of the items. The first item in the list will be the default
        $scope.options = {
            // html attributes
            // validation
            restrictToFormat: true,
            preserveInputFormat: true,
            allowEmpty: true,
            // color
            format: 'rgb',
            case: 'lower',
            // sliders
            hue: [true, false],
            alpha: false,
            dynamicHue: false,
            dynamicSaturation: false,
            dynamicLightness: false,
            dynamicAlpha: false,
            // swatch
            swatchPos: 'left',
            // popup
            round: true,
            // pos: ['bottom left', 'bottom right', 'top left', 'top right'],
            inline: true
            // horizontal: [false, true],
        };

        color_picker = document.getElementById("color_picker");
        color_id = document.getElementById("color_id");
        color_picker.onmousedown = select_color;
        color_picker_add();

        function color_picker_add() {
            color_picker_ = color_picker.getContext("2d"),
                center_x = (color_picker.width)/2,
                center_y = (color_picker.height)/2,
                sx = center_x,
                sy = center_y;
            console.log('color_picker_',color_picker_);
            palette = new color_picker_element(center_x, center_y, sx, sy);
            palette.draw();
        }

        function select_color(e) {
            var x = e.pageX - color_picker.offsetLeft - 34,
                y = e.pageY - color_picker.offsetTop - 408,
                pixel = color_picker.getContext("2d").getImageData(x, y, 2, 2).data,
                pixelColor = "rgb(" + pixel[0] + ", " + pixel[1]+", "+ pixel[2]+ ")";
            color_id.style.backgroundColor = pixelColor;
            $scope.pixelColor = pixelColor;
            console.log('color_picker_select_color',color_picker_);
            console.log('y  _select_color',y);
            console.log('x  _select_color',x);
            console.log('pixel  _select_color',pixel);
            console.log('color_picker.getContext("2d") _select_color',color_picker.getContext("2d").getImageData(50,50,1,1).data);
            // console.log('$scope-color-picker_select_color', $scope);
        }
// console.log('pixelColor', pixelColor);
        console.log('$scope-color-picker', $scope);
        function color_picker_element(center_x, center_y, sx, sy) {
            this.center_x = center_x;
            this.center_y = center_y;
            this.sx = sx;
            this.sy = sy;
            this.draw = function() {
                for(var i = 0; i < 360; i+=0.1)
                {
                    var rad = (i-45) * (Math.PI) / 180;
                    color_picker_.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";
                    color_picker_.beginPath();
                    color_picker_.moveTo(center_x, center_y);
                    color_picker_.lineTo(center_x + sx * Math.cos(-rad), center_y + sy * Math.sin(-rad));
                    color_picker_.stroke();
                }
            }
        }

    }
  });
