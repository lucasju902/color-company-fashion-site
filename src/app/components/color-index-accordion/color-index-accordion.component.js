angular
  .module('app')
  .component('colorIndexAccordionComponent', {
    templateUrl: 'app/components/color-index-accordion/color-index-accordion.tmpl.html',
    controller: function ($location, $scope, anchorSmoothScroll, $window, $element) {
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
        var text_string = "il next month when you get to James Lemon and then you’re gonna be talkin’ about t do that. And two: you dropped a hundred and fifty grand on a fuckin’ education you coulda got for a dollar fifty in late charges at the public library.";

        drawWordCloud(text_string);

        function drawWordCloud(text_string){
            var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,,says,said,shall";

            var word_count = {};

            var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
            if (words.length == 1){
                word_count[words[0]] = 1;
            } else {
                words.forEach(function(word){
                    var word = word.toLowerCase();
                    if (word != "" && common.indexOf(word)==-1 && word.length>1){
                        if (word_count[word]){
                            word_count[word]++;
                        } else {
                            word_count[word] = 1;
                        }
                    }
                })
            }

            var svg_location = "#chart";
            var width = 450;
            var height = 450;

            var fill = d3.scale.category20();

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
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.key; });
            }

            d3.layout.cloud().stop();
        }
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

        var self = this;
        self.height = $window.innerHeight * 0.5;
        self.width = 250;
        self.wordClicked = wordClicked;
        self.rotate = rotate;
        self.useTooltip = true;
        self.useTransition = true;
        self.words = [
            {text: 'Angular',size: 25,color: '#0e6632',tooltipText: 'Angular Tooltip'},
            {text: 'Angular23',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'},
            {text: 'Angular2',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'},
            {text: 'Angular23',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'},
            {text: 'Angular23',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'},
            {text: 'Angular',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'}
        ]
        //custom rotate
        function rotate(){
            return ~~(Math.random() * 2) * 90;
        }
        //custom random
        function random(){
            return 0.4; //a constant value here will ensure the word position is fixed upon each page refresh.
        }
        function wordClicked(word){
            alert(word);
        }
    }
  });
angular.module('ui.bootstrap').controller('AccordionCtrl', function ($scope) {
    $scope.oneAtATime = true;
});
angular.module('app').controller('appController', function ($window,$element) {

    var self = this;
    self.height = $window.innerHeight * 0.5;
    self.width = $element.find('word-cloud')[0].offsetWidth;
    self.wordClicked = wordClicked;
    self.rotate = rotate;
    self.useTooltip = true;
    self.useTransition = true;
    self.words = [
        {text: 'Angular',size: 25,color: '#0e6632',tooltipText: 'Angular Tooltip'},
        {text: 'Angular23',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'},
        {text: 'Angular2',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'},
        {text: 'Angular23',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'},
        {text: 'Angular23',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'},
        {text: 'Angular',size: 35,color: '#0e558',tooltipText: 'Angular2 Tooltip'}
    ]
    //custom rotate
    function rotate(){
        return ~~(Math.random() * 2) * 90;
    }
    //custom random
    function random(){
        return 0.4; //a constant value here will ensure the word position is fixed upon each page refresh.
    }
    function wordClicked(word){
        alert(word);
    }
});