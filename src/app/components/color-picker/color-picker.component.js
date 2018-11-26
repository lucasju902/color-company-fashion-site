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

        var color_picker = document.getElementById("color_picker");
        var color_id = document.getElementById("color_id");
        $scope.changeColor = function () {
            color_picker.onmousedown = select_color;
        };
        // color_picker.onmousedown = select_color;
        color_picker_add();

        // function hslToRgb(h, s, l) {
        //     console.log("ffffffffffffffffffffffffffffffffffffffffffff",h,s,l);
        //     var r, g, b;
        //
        //     if (s == 0) {
        //         r = g = b = l; // achromatic
        //     } else {
        //         function hue2rgb(p, q, t) {
        //             if (t < 0) t += 1;
        //             if (t > 1) t -= 1;
        //             if (t < 1/6) return p + (q - p) * 6 * t;
        //             if (t < 1/2) return q;
        //             if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        //             return p;
        //         }
        //
        //         var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        //         var p = 2 * l - q;
        //
        //         r = hue2rgb(p, q, h + 1/3);
        //         g = hue2rgb(p, q, h);
        //         b = hue2rgb(p, q, h - 1/3);
        //     }
        //     console.log('[ r , g , b ]', r , g , b )
        //     return [ r , g , b ];
        // }

        // function rgbToHsl(r, g, b){
        //     r /= 255, g /= 255, b /= 255;
        //     var max = Math.max(r, g, b), min = Math.min(r, g, b);
        //     var h, s, l = (max + min) / 2;
        //
        //     if(max == min){
        //         h = s = 0; // achromatic
        //     }else{
        //         var d = max - min;
        //         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        //         switch(max){
        //             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        //             case g: h = (b - r) / d + 2; break;
        //             case b: h = (r - g) / d + 4; break;
        //         }
        //         h /= 6;
        //     }
        //
        //     return [h, s, l];
        // };

        // function rgbToHsl(r, g, b){
        //     r /= 255, g /= 255, b /= 255;
        //     var max = Math.max(r, g, b), min = Math.min(r, g, b);
        //     var h, s, l = (max + min) / 2;
        //
        //     if (max == min) { h = s = 0; }
        //     else {
        //         var d = max - min;
        //         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        //
        //         switch (max){
        //             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        //             case g: h = (b - r) / d + 2; break;
        //             case b: h = (r - g) / d + 4; break;
        //         }
        //
        //         h /= 6;
        //     }
        //
        //     return [(h*100+0.5)|0, ((s*100+0.5)|0) + '%', ((l*100+0.5)|0) + '%'];
        // }
    // });


        $scope.colorPickerSliderGray = function  () {
            var value = document.getElementById('rg').value;
            // document.getElementById('threeDotSpeed').innerHTML = value;
// var p = hslToRgb(1, value, 50);
//             console.log('hsl2rgb', p);

            color_id.style.filter =  "saturate(" + value + "%)";
            // if(value) interval = 40 / value;
            // console.log('\-\-\-colorPickerSlider', $scope);

        };

        $scope.colorPickerSliderOpacity = function  () {
            var value = document.getElementById('range_opacity').value;
            document.getElementById('value_span').innerHTML = value*100 + '%';
            color_id.style.opacity =  value;
            // if(value) interval = 40 / value;
            // console.log('\-\-\-colorPickerSlider', $scope.colorPicker);
        };

        $scope.colorPickerRGB = function () {
            var colorInputR = document.getElementById('colorInputR').value;
            var colorInputG = document.getElementById('colorInputG').value;
            var colorInputB = document.getElementById('colorInputB').value;

            $scope.colorRGB_R = colorInputR;
            $scope.colorRGB_G = colorInputG;
            $scope.colorRGB_B = colorInputB;

            inputRGB = "rgb(" + $scope.colorRGB_R + ", " + $scope.colorRGB_G +", "+ $scope.colorRGB_B + ")";
            color_id.style.backgroundColor = inputRGB;
        }

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
            var x = e.pageX - color_picker.offsetLeft - 48,
                y = e.pageY - color_picker.offsetTop - 665,
                pixel = color_picker.getContext("2d").getImageData(x, y, 2, 2).data,

                // pixel1 = color_picker.getContext("2d").getImageData(x, y, 2, 2),
                pixelColor = "rgb(" + pixel[0] + ", " + pixel[1]+", "+ pixel[2]+ ")";
            color_id.style.backgroundColor = pixelColor;
            // var rgbToHsl_var = rgbToHsl(pixel[0] , pixel[1], pixel[2]);
            // hsl_path = "hsl(" + rgbToHsl_var[0] + ", " + rgbToHsl_var[1]+", "+ rgbToHsl_var[2]+ ")";
            // console.log('hsl_path', hsl_path)
            // color_id.style.backgroundColor = hsl_path;
            // console.log('rgbToHsl_var_rgbToHsl_var_rgbToHsl_var======================',rgbToHsl_var);
            $scope.pixel = pixel;
            $scope.colorRGB_R = pixel[0];
            $scope.colorRGB_G = pixel[1];
            $scope.colorRGB_B = pixel[2];
            console.log('pixelColor _select_color', $scope);
            console.log('y  _select_color',y);
            console.log('x  _select_color',x);
            // console.log('pixel  _select_color',pixel);
            // console.log('color_picker.getContext("2d") _select_color',color_picker.getContext("2d").getImageData(50,50,1,1).data);
            // console.log('$scope-color-picker_select_color', $scope);
        }
// console.log('pixelColor', pixelColor);
//         console.log('$scope-color-picker', $scope);
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
