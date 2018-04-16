(function () {
  'use strict';

  angular.module('app').directive('hueChartCommonWithGroups',
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

            if (scope.mode && scope.mode.extraView) {
              var rowsAmount = 5, columnsAmount = 5;
              var allColors = [];
              _.each(scope.data.groups, function (gr) {
                _.each(gr.colors, function (c) {
                  allColors.push({color: c.color});
                });
              });

              scope.rows = [];
              for (var i = 0; i < rowsAmount; i++) {
                var row = {colors: []};
                scope.rows.push(row);
                for (var j = 0; j < columnsAmount; j++) {
                  var column = {};
                  row.colors.push(column);

                  var color = allColors[i * columnsAmount + j];
                  if (!color) {
                    column.isEmpty = true;
                  } else {
                    column.color = color.color;
                  }
                }
              }
            }
            var containerBagel = element.find('[chart-type="bagel"]').html('');
            var containerBrief = element.find('[chart-type="brief"]').html('');
            var containerGroups = element.find('[chart-type="groups"]').html('');

            var groups = _.map(scope.data.groups, function (c) {
              return {
                value: c.value,
                valueTitle: Math.round(c.percentage * 100) + '%',
                value2: c.value,//Math.round(c.value * 1000),
                valueTitle2: Math.round(c.percentage * 100),
                title: c.title,
                color: c.color
              }
            });

            var colors = _.map(scope.data.common, function (c) {
              return {
                value: c.value,
                valueTitle: Math.round(c.percentage * 100) + '%',
                value2: c.value,//Math.round(c.value * 1000),
                valueTitle2: Math.round(c.percentage * 100),
                title: c.color,
                color: c.color
              }
            });

            var bagelOptions = {
              bars: {
                radius: 130,
                radiusOuter: 1,
                radiusInner: 105,
                legend: {
                  radius: 50,
                  radiusInner: 40,
                  position: 'none'
                }
              }
            };

            if (!scope.mode || !scope.mode.extraView) {
              var ch = new chartBoxBagel({
                data: colors,
                container: containerBagel[0],
                options: bagelOptions
              });

              ch = new chartDotsHorizontal({
                data: colors,
                container: containerBrief[0],
                options: {
                  layout: {
                    bars: {
                      separator: {
                        radius: 7
                      }
                    }
                  }
                }
              });

            }
            ch = new chartBoxLinearHorizontal({
              data: groups,
              container: containerGroups[0],
              options: {
                layout: {
                  bars: {
                    separator: {
                      radius: 6
                    }
                  }
                }
              }
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
          templateUrl: 'app/directives/custom-infographics-directives/chart-common-with-groups.html'
        };

        return directive;

      }
    ]);
}());
