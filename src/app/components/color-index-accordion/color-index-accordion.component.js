angular
  .module('app')
  .component('colorIndexAccordionComponent', {
    templateUrl: 'app/components/color-index-accordion/color-index-accordion.tmpl.html',
    controller: function ($location, $scope, anchorSmoothScroll) {
      var vm = this;
      vm.gotoElement = function (eID) {
        $location.hash('prefooter');
        anchorSmoothScroll.scrollTo(eID);
        $location.hash('');
      };
// Chroma.js Chroma.js Chroma.js Chroma.jsChroma.js Chroma.js Chroma.js Chroma.js Chroma.js Chroma.js Chroma.jsChroma.js Chroma.js
//         // document.addEventListener('DOMContentLoaded', function() {
//
//             var btnGenerateColorScheme = document.querySelector('#generate-color-scheme'),
//                 btnGenerateColorScale = document.querySelector('#generate-color-scale'),
//                 colorScheme = document.querySelector('.color-scheme'),
//                 colorScale = document.querySelector('.color-scale'),
//                 steps = 99, // is preferably an odd number
//                 chromaColor, userColor, colorList, scaleColors, scaleCount, scaleList;
//
//             btnGenerateColorScheme.addEventListener('click', function() {
// // Reinitialize the color list.
//                 colorList = [];
//
//                 // Get the color value.
//                 userColor = document.querySelector('#user-color').value;
//
//                 // Reset the content of the color scheme list.
//                 colorScheme.innerHTML = '';
//
//                 // Initialize Chroma.
//                 chromaColor = chroma(userColor);
//
//                 // Create a monchromatic color scheme.
//                 for (var i = 0; i < steps; i++) {
//                     colorList[i] = chromaColor.darken(i * 0.04);
//                     console.log('i', i);
//                     console.log('colorList', colorList[i]);
//
//                 }
//
//                 // Generate some elements.
//                 for (var j = 0; j < colorList.length; j++) {
//                     var newItem = document.createElement('li');
//
//                     newItem.style.backgroundColor = colorList[j];
//                     newItem.innerHTML = '<div class="color-info">' +
//                         '<span>' + colorList[j] + '</span>' +
//                         '<span>' + chroma(colorList[j]).css() + '</span>' +
//                         '</div>';
//
//                     colorScheme.appendChild(newItem);
//                 }
//             });
//
//             btnGenerateColorScale.addEventListener('click', function() {
//                 scaleList = [];
//                 scaleColors = [];
//
//                 // Get the color values and scale count.
//                 scaleColors[0] = document.querySelector('#scale-color-1').value;
//                 scaleColors[1] = document.querySelector('#scale-color-2').value;
//                 scaleCount = document.querySelector("#scale-count").value;
//
//                 // Reset the content of the color scale list.
//                 colorScale.innerHTML = '';
//
//                 // Create the color scale.
//                 scaleList = chroma.scale(scaleColors).colors(scaleCount);
//
//                 // Generate some elements.
//
//                 for (var x = 0; x < scaleList.length; x++) {
//                     // Generate some elements.
//                     var newItem = document.createElement('li');
//
//                     newItem.style.backgroundColor = scaleList[x];
//
//                     colorScale.appendChild(newItem);
//                 }
//             });
//
//         // });

        //
        // var yellow1 = "FFFF99";
        // var yellow2 = "FFFF00";
        // var blue = "0000FF";
        //
        // function hexColorDelta(hex1, hex2) {
        //     // get red/green/blue int values of hex1
        //     var r1 = parseInt(hex1.substring(0, 2), 16);
        //     var g1 = parseInt(hex1.substring(2, 4), 16);
        //     var b1 = parseInt(hex1.substring(4, 6), 16);
        //     // get red/green/blue int values of hex2
        //     var r2 = parseInt(hex2.substring(0, 2), 16);
        //     var g2 = parseInt(hex2.substring(2, 4), 16);
        //     var b2 = parseInt(hex2.substring(4, 6), 16);
        //     // calculate differences between reds, greens and blues
        //     var r = 255 - Math.abs(r1 - r2);
        //     var g = 255 - Math.abs(g1 - g2);
        //     var b = 255 - Math.abs(b1 - b2);
        //     // limit differences between 0 and 1
        //     r /= 255;
        //     g /= 255;
        //     b /= 255;
        //     // 0 means opposit colors, 1 means same colors
        //     return (r + g + b) / 3;
        // }
        //
        // console.log(hexColorDelta(yellow1, yellow2)); // 0.7999999999999999
        // console.log(hexColorDelta(yellow1, blue)); // 0.19999999999999998
        //
    }
  });
angular.module('ui.bootstrap').controller('AccordionCtrl', function ($scope) {
    $scope.oneAtATime = true;
});
