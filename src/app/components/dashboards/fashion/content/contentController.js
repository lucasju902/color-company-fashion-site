angular.module('app').controller('contentFashionController', [
  '$scope', 'appConfig', 'dashboardRepository', 'charts', '$q', '$interpolate', 'repo.meta', 'common', '$http',
  function (scope, appConfig, dashboardRepository, charts, $q, $interpolate, meta, common, $http) {
    var vm = this;

    vm.meta = {};
    vm.filter = {};
    vm.grayList = {};

    scope.getModel = function(index) {
      return vm.models[index];
    }

    scope.getTitle = function(index) {
      return vm.titles[index];
    }

    scope.getDescription = function(index) {
      return vm.descriptions[index];
    }

    scope.graphIndex = 0;
    scope.showGraph = false;
    scope.showGraphDialog = function(index) {
      scope.graphIndex = index;
      scope.showGraph = true;
    }

    scope.isShowGraphDialog = function() {
      return scope.showGraph;
    }

    scope.closeGraphDialog = function() {
      scope.showGraph = false;
    }

    var cache = {
      designers: [],
      categories: [],
      regions: {},
      cities: []
    };

    var loading = {
      ready: false,
      designersReady: $q.defer(),
      metaLoaded: $q.defer(),
      metaReady: $q.defer()
    };

    function getObject(id, prop) {
      var obj = {
        id: "all",
        title: "all"
      };

      if (id == "") {
        return obj;
      }

      for (var i = 0; i < scope.controlsData[prop].length; i++) {
        var data = scope.controlsData[prop][i];
        if (data.id == id) {
          obj = data;
          break;
        }
      }
      return obj;
    }

    vm.prepareRequestParams = function () {
      var params = {
        city: getObject(scope.menus.city, 'cities').title,
        year: scope.menus.year == "" ? "all" : scope.menus.year,
        season: getObject(scope.menus.season, 'seasons').title,
        category: getObject(scope.menus.category, 'categories').title,
        region: scope.menus.region == "" ? "all" : scope.menus.region,
        designer: getObject(scope.menus.designer, 'designers').title
      };

      return params;
    };

    vm.prepareColorsParams = function () {
      var param = {};
      if (scope.menus.city != "") {
        param.city_id = scope.menus.city;
      }
      if (scope.menus.season != "") {
        param.season_id = scope.menus.season;
      }
      if (scope.menus.category != "") {
        param.category_id = scope.menus.category;
      }
      if (scope.menus.designer != "") {
        param.designer_id = scope.menus.designer;
      }

      if (scope.menus.year == "") {
        param.year_id = "all";
      } else {
        param.year_id = scope.menus.year;
      }

      return param;
    };

    vm.prepareColors = function () {
      if (scope.menus.season != "") {
        return {all: getObject(scope.menus.season, 'seasons'), category: 'season'};
      }
      if (scope.menus.city != "") {
        return {all: getObject(scope.menus.city, 'cities'), category: 'city'};
      }
      if (scope.menus.category != "") {
        return {all: getObject(scope.menus.category, 'categories'), category: 'category'};
      }
      if (scope.menus.designer != "") {
        return {all: getObject(scope.menus.designer, 'desingers'), category: 'designer'};
      }
      return {all: {id: 2018}, category: 'year'};
    };

    scope.tab = 1;
    scope.setTab = function (tabId) {
      scope.tab = tabId;
    };

    scope.isSet = function (tabId) {
        return scope.tab === tabId;
    };

    scope.topColorsExpanded = false;
    scope.toggleTopColorsExpandedMode = function () {
      scope.topColorsExpanded = !scope.topColorsExpanded;
    };

    scope.colorFrequencyExpanded = false;
    scope.toggleColorFrequencyExpandedMode = function () {
      scope.colorFrequencyExpanded = !scope.colorFrequencyExpanded;
    };

    scope.colorFrequencyByRegionExpanded = false;
    scope.toggleColorFrequencyByRegionExpandedMode = function () {
      scope.colorFrequencyByRegionExpanded = !scope.colorFrequencyByRegionExpanded;
    };

    scope.colorFrequencyByCityExpanded = false;
    scope.toggleColorFrequencyByCityExpandedMode = function () {
      scope.colorFrequencyByCityExpanded = !scope.colorFrequencyByCityExpanded;
    };

    scope.colorPaletteExpanded = false;
    scope.toggleColorPaletteExpandedMode = function () {
      scope.colorPaletteExpanded = !scope.colorPaletteExpanded;
    };

    scope.designerImagesExpanded = false;
    scope.toggleDesignerImagesExpandedMode = function () {
      scope.designerImagesExpanded = !scope.designerImagesExpanded;
    };

    vm.charts = [];
    scope.$watch('menus', function(data) {
      vm.charts = [{
        qNumber: 'CO2a',
        id: 'colorsUniqueWithLevels',
        group: 'colorsUniqueWithLevels',
        title: 'Color Mosaic View With Popularity',
        chartTitle: 'Color Mosaic View With Popularity {{vm.parseTitle(0)}} {{vm.parseTitle(1)}}',
        api: function () {
          return charts.colorsUniqueGroups(vm.prepareRequestParams());
        },
        filters: {
          category: true,
          season: true,
          year: true,
          region: true,
          city: true
        },
        titleGroups: [
          ['category', 'season', 'year'],
          ['region']
        ]
      }, {
        qNumber: 'CO3a',
        id: 'trends',
        group: 'trends',
        title: 'Five Year Color Comparison',
        chartTitle: 'Five Year Color Comparison {{vm.parseTitle(0)}} {{vm.parseTitle(1)}}',
        api: function () {
          var yearsRange = _.range(data.year - 4, data.year + 1);
          var customParams = vm.prepareRequestParams();

          if (data.year == 'all') {
            yearsRange = _.range(vm.meta.years[1].title - 4, vm.meta.years[1].title + 1);
          } else if (yearsRange[0] < vm.meta.years[vm.meta.years.length - 1].title) {
            yearsRange = _.range(vm.meta.years[vm.meta.years.length - 1].title, vm.meta.years[vm.meta.years.length - 1].title + 5);
          }

          return $q.all(_.map(yearsRange, function (year) {
            customParams.year = year;
            return charts.colorGroupsByCityPeriod(customParams);
          })).then(function (results) {
            return _.map(results, function (result, i) {
              return {
                title: yearsRange[i],
                data: result
              };
            });
          });
        },
        filters: {
          category: true,
          season: true,
          year: true,
          region: true,
          city: true
        },
        titleGroups: [
          ['category', 'season', 'year'],
          ['region']
        ]
      }, {
        qNumber: 'CA1a',
        id: 'colorsByCategoryPeriod',
        group: 'colorsByCategoryPeriod',
        title: 'Color Popularity By Category',
        chartTitle: 'Color Popularity By Category {{vm.parseTitle(0)}} {{vm.parseTitle(1)}}',
        api: function () {
          return charts.colorGroupsByCityPeriod(vm.prepareRequestParams());
        },
        filters: {
          category: true,
          season: true,
          year: true,
          region: true,
          city: true
        },
        titleGroups: [
          ['category', 'season', 'year'],
          ['region']
        ]
      }];
    });

    vm.models = [];
    vm.titles = [];
    vm.descriptions = [];

    // Behaviour
    meta.objects().then(function (result) {
      var years = [];
      for (var i = result.years.to; i >= result.years.from; i--) {
        years.push({id: i, title: i});
      }

      vm.meta.years = years;
      vm.meta.colorGroups = result.colorGroups;
      vm.meta.categories = result.categories;
      vm.meta.seasons = result.seasons;
      vm.meta.regions = common.generic.regions;
      vm.meta.cities = result.cities;

      _.each(vm.meta, function (item, key) {
        var newTitle = 'All ' + key;
        if (key !== 'colorGroups') {
          item.unshift({id: 'all', title: newTitle.toUpperCase(), region: 'all', serverName: 'all', all: true})
        }
      });

      angular.copy(vm.meta.cities, cache.cities);

      // vm.filter.color = vm.meta.colorGroups[0];
      // // vm.filter.year = _.find(vm.meta.years, {id: 2017}) || vm.meta.years[vm.meta.years.length - 1];
      // vm.filter.year = vm.meta.years[0];
      // vm.filter.season = vm.meta.seasons[0];
      // vm.filter.category = vm.meta.categories[0];
      // vm.filter.city = vm.meta.cities[0];
      // vm.filter.region = vm.meta.regions[0];

      // loading.metaLoaded.resolve();

      vm.charts.forEach(function(currentChart, i) {
        vm.models[i] = null;
        vm.titles[i] = '';
        vm.descriptions[i] = '';

        currentChart.api().then(function(result) {
          vm.models[i] = result;
          if (vm.charts[i].apiAfter) {
            vm.charts[i].apiAfter(vm.models[i], result);
          }
          vm.titles[i] = prepareTitle(vm.charts[i].chartTitle);
          prepareDescription(i);
        });
      });
  
    });

    function prepareTitle(title) {
      var exp = $interpolate(title);
      return exp(scope);
    }

    function prepareDescription(i) {
      vm.descriptions[i] = vm.descriptions[i] || (scope.menus.year + ' | COLORS-' + vm.charts[i].qNumber + ' | CITIES-' +
      scope.menus.city + ' | REGIONS-' + scope.menus.region + ' | DESIGNER-' + scope.menus.designer +
        ' | SEASONS-' + scope.menus.season);

      var regionId = null;
      switch (scope.menus.region) {
        case 'europe':
          regionId = 2;
          break;
        case 'north_america':
          regionId = 3;
          break;
        case 'latin_america':
          regionId = 4;
          break;
        case 'asia_pacific':
          regionId = 1;
          break;
      }

      var yearFrom = null;
      var yearTo = scope.menus.year === 'all' ? vm.meta.years[1].title : scope.menus.year;
      if (vm.charts[i].qNumber === 'CO3a' || vm.charts[i].qNumber === 'SE2a' || vm.charts[i].qNumber === 'SE2b') {
        yearFrom = yearTo - 4;
      } else if (vm.charts[i].qNumber === 'CA3a' || vm.charts[i].qNumber === 'CA3b') {
        yearFrom = yearTo - 2;
      } else if (vm.charts[i].qNumber === 'DE2a' || vm.charts[i].qNumber === 'DE2b') {
        yearFrom = yearTo - 1;
      }

      $http({
        url: (appConfig.webServiceUrl + 'stats'),
        method: 'GET',
        params: {
          fashionSeason: scope.menus.season === 'all' ? null : scope.menus.season,
          fashionDesigner: scope.menus.designer === 'all' ? null : scope.menus.designer,
          fashionRegion: regionId || null,
          fashionCity: scope.menus.city === 'all' ? null : scope.menus.city,
          fashionCategory: scope.menus.category === 'all' ? null : scope.menus.category,
          fashionYear: yearFrom || scope.menus.year === 'all' ? null : scope.menus.year,
          yearFrom: yearFrom || null,
          yearTo: yearFrom ? yearTo : null
        }
      }).then(function (res) {
        // vm.grayList = res.data.data;
        vm.descriptions[i] = 'YEARS-' + res.data.counts.years + ' | COLORS-' + res.data.counts.colors +
          ' | CITIES-' + res.data.counts.cities + ' | REGIONS-' + res.data.counts.regions +
          ' | DESIGNER-' + res.data.counts.designers + ' | SEASONS-' + res.data.counts.seasons;
      });
    }
  }
]);
