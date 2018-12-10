angular
  .module('app')
  .component('colorIndexAccordionComponent', {
    templateUrl: 'app/components/color-index-accordion/color-index-accordion.tmpl.html',
    controller: function ($location, $scope, anchorSmoothScroll, $window, $element, searchColor) {
        var vm = this;
        vm.colorData = searchColor.get()[0];
        vm.searchColorName = searchColor.get()[1];
        console.log("$scope.colorData : colorIndexAccordionComponent", vm);

        var colorNames = [], colorRGB = [];

        if (!jQuery.isEmptyObject(vm.colorData)) {
            if (vm.colorData.length > 1) {
                vm.colorData.forEach(function (color) {
                    colorRGB.push(color.rgb);
                    colorNames.push(color.name);
                });
            }
        }
        colorNames = colorNames.join(' ');

        // var text_string = "be talkin’ about t do that. And two: you dropped a hundred and fifty grand on a fuckin’ education you coulda got for a dollar fifty in late charges at the public library.";
        // console.log("d3.layout", d3);
        drawWordCloud(colorNames);

        function drawWordCloud(text_string) {
            var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,,says,said,shall";

            var word_count = {};

            var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
            if (words.length === 1) {
                word_count[words[0]] = 1;
            } else {
                words.forEach( function (word) {
                    var word = word.toLowerCase();
                    if (word !== "" && common.indexOf(word) === -1 && word.length > 1){
                        if (word_count[word]) {
                            word_count[word]++;
                        } else {
                            word_count[word] = 1;
                        }
                    }
                });
            }

            var svg_location = "#chart";
            var width = 650;
            var height = 450;

            // var fill = d3.scale.category20();
            // // var fill = colorRGB

            var word_entries = d3.entries(word_count);

            var xScale = d3.scale.linear()
                .domain([0, d3.max(word_entries, function(d) {
                    return d.value;
                })
                ])
                .range([10,100]);
            // d3.layout.cloud().size([width, height])
            //     .timeInterval(20)
            //     .words(word_entries)
            //     .fontSize(function(d) { return xScale(+d.value); })
            //     .text(function(d) { return d.key; })
            //     .rotate(function() { return ~~(Math.random() * 2) * 90; })
            //     .font("Impact")
            //     .on("end", draw)
            //     .start();

            function draw(words) {
                d3.select(svg_location).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return xScale(d.value) + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) { return "rgb("+colorRGB[i]+")" })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.key; });
            }

            // d3.layout.cloud().stop();
        }

                                                                // Chroma.js Chroma.js Chroma.js Chroma.jsChroma.js Chroma.js Chroma.js Chroma.js Chroma.js Chroma.js Chroma.jsChroma.js Chroma.js
        // document.addEventListener('DOMContentLoaded', function() {

            var btnGenerateColorScheme = document.querySelector('#generate-color-scheme'),
                btnGenerateColorScale = document.querySelector('#generate-color-scale'),
                colorScheme = document.querySelector('.color-scheme'),
                colorScale = document.querySelector('.color-scale'),
                steps = 99, // is preferably an odd number
                chromaColor, userColor, colorList, scaleColors, scaleCount, scaleList;

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

            // btnGenerateColorScale.addEventListener('click', function() {
            //     scaleList = [];
            //     scaleColors = [];
            //
            //     // Get the color values and scale count.
            //     // scaleColors[0] = document.querySelector('#scale-color-1').value;
            //     scaleColors[0] = vm.colorData[0].rgb;
            //     console.log("scaleColors", scaleColors);
            //     scaleColors[1] = document.querySelector('#scale-color-2').value;
            //     scaleCount = document.querySelector("#scale-count").value;
            //
            //     // Reset the content of the color scale list.
            //     colorScale.innerHTML = '';
            //
            //     // Create the color scale.
            //     scaleList = chroma.scale(scaleColors).colors(scaleCount);
            //
            //     // Generate some elements.
            //
            //     for (var x = 0; x < scaleList.length; x++) {
            //         // Generate some elements.
            //         var newItem = document.createElement('li');
            //
            //         newItem.style.backgroundColor = scaleList[x];
            //
            //         colorScale.appendChild(newItem);
            //     }
            // });

        // function componentToHex(c) {
        //     var hex = c.toString(16);
        //     return hex.length == 1 ? "0" + hex : hex;
        // }
        //
        // function rgbToHex(r, g, b) {
        //     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        // }
        //
        // alert( rgbToHex(255, 255, 255) ); // #0033ff

        // });
    }
  });
angular.module('ui.bootstrap').controller('AccordionCtrl', function ($scope) {
    $scope.oneAtATime = true;
});
