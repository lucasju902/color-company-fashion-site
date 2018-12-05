angular
  .module('app')
  .component('colorIndexAccordionComponent', {
    templateUrl: 'app/components/color-index-accordion/color-index-accordion.tmpl.html',
    controller: function ($location, $scope, anchorSmoothScroll, $window, $element, searchColor) {
        var vm = this;
        vm.colorData = searchColor.get();
        console.log("$scope.colorData : colorIndexAccordionComponent", vm.colorData);

        var colorNames = [], colorRGB = [];

        if (vm.colorData.length > 1) {
            vm.colorData.forEach(function (color) {
                colorRGB.push(color.rgb);
                colorNames.push(color.name);
            });
        }

        colorNames = colorNames.join(' ');


        // var text_string = "be talkin’ about t do that. And two: you dropped a hundred and fifty grand on a fuckin’ education you coulda got for a dollar fifty in late charges at the public library.";
        console.log("d3.layout", d3.layout);
        drawWordCloud(colorNames);

        function drawWordCloud(text_string){
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
                })
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
            d3.layout.cloud().size([width, height])
                .timeInterval(20)
                .words(word_entries)
                .fontSize(function(d) { return xScale(+d.value); })
                .text(function(d) { return d.key; })
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .on("end", draw)
                .start();

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

            d3.layout.cloud().stop();
        }
    }
  });
angular.module('ui.bootstrap').controller('AccordionCtrl', function ($scope) {
    $scope.oneAtATime = true;
});
