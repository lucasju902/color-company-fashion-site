(function () {
  'use strict';

  angular.module('app').directive('hueChartBySeasonFiveYears',
    [
      'common', 'config', 'chartsHelper',
      function (common, config, chartsHelper) {

        function link(scope, element, attributes) {

//                scope.value = '';
          scope.$watch('data', bindData);

//                bindData();

          function bindData() {

            /////////////
            var containers = element.find('.f-season');
            _.each(containers,
              function (c, i) {
                var data = (scope.data || [])[i];
                if (!data) {
                  return;
                }
                c = $(c);

                c.find('h3').text('Fall' + data.year);

                var containerUnique = c.find('[chart-type="unique"]').html('');
                var ch = new chartSpheric({
                  data: data.colorsUnique,
                  container: containerUnique[0],
                  options: {}
                });

                var container = c.find('[chart-type="top4"]').html('');
                var colors = _.map(data.colors, function (c) {
                  return {
                    value: c.value,
                    valueTitle: Math.round(c.percentage * 100) + '%',
                    value2: c.value,//Math.round(c.value * 1000),
                    valueTitle2: Math.round(c.percentage * 100),
                    title: c.color,
                    color: c.color
                  }
                });

                ch = new chartDotsHorizontal({
                  data: colors,
                  container: container[0],
                  options: {}
                });

              });
            return;
            var n = Math.round(Math.random() * 4 - .5);
            var maxR = n !== 1 ? 255 : Math.round(Math.random() * 255 - .5);
            var maxG = n !== 2 ? 255 : Math.round(Math.random() * 255 - .5);
            var maxB = n !== 3 ? 255 : Math.round(Math.random() * 255 - .5);
            var count = Math.random() * 1000 + 100;
            for (var l = 0; l < count; l++) {
              var color = String.format('rgb({0},{1},{2})', Math.round(Math.random() * maxR), Math.round(Math.random() * maxG), Math.round(Math.random() * maxB));
              result.push({
                color: color,
                title: color
              });
            }

            ch = new chartSpheric({
              data: dataPrepared,
              container: container,
              options: {}
            });

            result.push({
              value: value,
              valueTitle: Math.round(value) + '%',
              value2: Math.round(Math.random() * 1000),
              valueTitle2: Math.round(Math.random() * 1000),
              title: _colors[i].title,
              color: _colors[i].color
            });

            ch = new chartDotsHorizontal({
              data: dataPrepared,
              container: container,
              options: {}
            });

          }
        }

        var directive = {
          link: link,
          restrict: 'E',
          replace: true,
          scope: {
            data: '='
          },
          templateUrl: 'app/directives/custom-infographics-directives/chart-by-season-five-years.html'
        };

        return directive;

      }
    ]);

  angular.module('app').directive('hueChartBySeasonFiveYearsColors',
    [
      'common', 'config', 'chartsHelper',
      function (common, config, chartsHelper) {

        function link(scope, element, attributes) {

//                scope.value = '';
          scope.$watch('data', bindData);

//                bindData();

          function bindData() {

            if (!scope.data) {
              return;
            }
            /////////////

            var allSeasons = [];
            for (var n = 0; n < 5; n++) {
              var season = {title: 'FW201' + (5 - n), colors: []};
              allSeasons.push(season);
              _.each(scope.data, function (gr, kg) {
                var colors = gr['colors' + (n + 1)];
                _.each(colors, function (c, kc) {
                  if (season.colors.length < 21 || n == 0) {
                    season.colors.push({color: c.color});
                  }
                });
              });
            }
            var season0Colors = allSeasons[0].colors;

            var rowsAmount = 4, columnsAmount = 6;

            var columns = scope.mainColumns = [];
            for (var ii = 0; ii < columnsAmount; ii++) {
              var column = {colors: []};
              columns.push(column);
              for (var j = 0; j < rowsAmount; j++) {
                var row = {};
                column.colors.push(row);

                var color = season0Colors[ii * rowsAmount + j];
                if (!color) {
                  row.isEmpty = true;
                } else {
                  row.color = color.color;
                }
              }
            }

            scope.seasons = allSeasons.splice(1, 4);

            var container = element.find('[chart-type="groups"]');
            var colors = _.map(scope.data,
              function (d) {
                var value = Math.round(d.percentage * 100);
                return {
                  value: value,
                  valueTitle: Math.round(value) + '%',
                  value2: Math.round(d.percentage * 100),
                  valueTitle2: Math.round(d.percentage * 100),
                  title: d.title,
                  color: d.color
                }
              });
            var ch = new chartDotsHorizontal({
              data: colors,
              container: container[0],
              options: {}
            });

          }
        }

        var directive = {
          link: link,
          restrict: 'E',
          replace: true,
          scope: {
            data: '=',
            mode: '='
          },
          templateUrl: 'app/directives/custom-infographics-directives/chart-by-season-five-years-colors.html'
        };

        return directive;

      }
    ]);
}());
