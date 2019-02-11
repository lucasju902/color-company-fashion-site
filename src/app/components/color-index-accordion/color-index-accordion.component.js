angular
  .module('app')
  .component('colorIndexAccordionComponent', {
    templateUrl: 'app/components/color-index-accordion/color-index-accordion.tmpl.html',
    controller: function ($location, $scope, anchorSmoothScroll, $window, $element, searchColor) {
      var vm = this;
      vm.colorsData = searchColor.get();
      vm.searchColorName = searchColor.get()[1];
      var colorRgb = searchColor.get()[2];
			var colors = vm.colorsData;

			$scope.pageSize = 80;

      if (colorRgb !== undefined) {

        var similarSaturateColors = [];
        var similarDarkenColors = [];

        for (var i = 0; similarSaturateColors.length <= 12; ++i) {
          similarSaturateColors.push(chroma(colorRgb).saturate(0.7 * i).hex());
          similarDarkenColors.push(chroma(colorRgb).darken(0.05 * i).hex());
        }
        // let notDuplicateColors = similarSaturateColors => similarSaturateColors.filter((v, i) => similarSaturateColors.indexOf(v) === i);
        // notDuplicateColors(similarSaturateColors);
        // console.log('colors(similarDarkenColors)', notDuplicateColors(similarSaturateColors));

        vm.similarSaturateColors = similarSaturateColors;
        // vm.similarSaturateColors = notDuplicateColors(similarSaturateColors);
        vm.similarDarkenColors = similarDarkenColors;
        // vm.similarDarkenColors = notDuplicateColors(similarDarkenColors.reverse());
      }

      var colorNamesItems = [],
        		colorRgbItems = [];

      if (vm.colorsData !== undefined) {
        if (vm.colorsData.length > 0) {
          vm.colorsData.forEach(function (color) {
            colorRgbItems.push(color.RGB);
						colorNamesItems.push(color.colorName);
          });
        }
      }
      var colorNames = colorNamesItems.join(',');

			// word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud word cloud

      if (colorNames.length > 1) {
				drawWordCloud(colorNames);
			}

      function drawWordCloud(text_string) {
        var common = 'poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,,says,said,shall';

        var word_count = {};

        var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
        // var words = text_string.split(',');
				// console.log("words", words);
        if (words.length === 1) {
          word_count[words[0]] = 1;
        } else {
          words.forEach(function (word) {
            var word = word.toLowerCase();
            if (word !== '' && common.indexOf(word) === -1 && word.length > 1) {
              if (word_count[word]) {
                word_count[word]++;
              } else {
                word_count[word] = 1;
              }
            }
          });
        }
        var svg_location = '#chart';
        console.log('innerWidth',innerWidth)
        var width = 800;
        var height = 450;

        var word_entries = d3.entries(word_count);

        var xScale = d3.scale.linear()
                .domain([0, d3.max(word_entries, function (d) {
                  return d.value;
                })
                ])
                .range([20, 100]);
        d3.layout.cloud().size([width, height])
                .timeInterval(20)
                .words(word_entries)
                .fontSize(function (d) {
                  console.log('xScale(Number(d.value)',xScale(Number(d.value)));
                  return xScale(Number(d.value)); 
                })
                .text(function (d) {
                  return d.key; 
                })
                .rotate(function () {
                  return ~~(Math.random() * 2) * 90; 
                })
                .font('Impact')
                .on('end', draw)
                .start();
				window.addEventListener("resize", draw(words));
        function draw(words) {
					console.log("window.innerWidth", window.innerWidth);
          d3.select(svg_location).append('svg')
                    .attr('width', width)
                    .attr('height', height)
						        // .attr("preserveAspectRatio", "xMidYMid meet")
						        // .attr("viewBox", "0 0 1000 450")
                    .append('g')
                    .attr('transform', 'translate(' + [400, 225] + ')')
                    // .attr('transform', 'scale(2)')
                    .selectAll('text')
                    .data(words)
                    .enter().append('text')
                    .style('font-size', function (d) {
                      return xScale(d.value*0.5) + 'px';
                    })
                    .style('font-family', 'Impact')
                    .style('fill', function (d, i) {
                      return 'rgb(' + colorRgbItems[i] + ')';
                    })
                    .attr('text-anchor', 'middle')
                    .attr('transform', function (d) {
                      return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                    })
                    .text(function (d) {
                      return d.key; 
                    });
        }
        d3.layout.cloud().stop();
      }
                                                                                                    // METHOD RGB TO HEX
      function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
      }

      function rgbToHex(r, g, b) {
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
      }
    }
  });
angular.module('ui.bootstrap').controller('AccordionCtrl', function ($scope) {
  $scope.oneAtATime = true;
});
