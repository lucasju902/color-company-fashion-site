angular
  .module('app')
  .component('coursesComponent', {
    templateUrl: 'app/components/courses/courses.tmpl.html',
    controller: function ($http, appConfig) {
      var vm = this;
      vm.pageData = [];
      vm.categories = [];
      vm.cacheItems = [];
      vm.level = [];
      vm.topic = [];
      vm.provider = [];
      vm.topicModel = 'TOPIC';
      vm.providerModel = 'PROVIDER';
      vm.levelModel = 'LEVEL';

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'courses.json')
          .then(function (res) {
            if (res && res.data && res.data.data) {
              vm.pageData = res.data.data.map(function (item) {
                item.data.date = moment(item.data.published_year + '-' + item.data.published_month + '-' + item.data.published_day, 'YYYY-MM-DD').format('MMMM D, YYYY');
                item.data.image_url = item.images && item.images[0] && item.images[0].image_url;
                vm.cacheItems.push(angular.copy(item.data));
                return item.data;
              });
              vm.pageData.forEach(function (t) {
                if (t.course_provider && !vm.provider.includes(t.course_provider)) {
                  vm.provider.push(t.course_provider);
                }
              });
              vm.topic = ['Color Foundation', 'Color Strategy', 'Color Naming'];
              vm.level = ['Beginner', 'Intermediate', 'Advanced'];
              vm.select();
            }
          });
      };

      vm.more = function () {
        vm.groups = _.chunk(angular.copy(vm.filterDate), 3);
      };

      vm.select = function () {
        if (vm.topic.includes(vm.topicModel) || vm.provider.includes(vm.providerModel) || vm.level.includes(vm.levelModel)) {
          vm.filterDate = angular.copy(vm.cacheItems).filter(function (t) {
            if ((!vm.topic.includes(vm.topicModel) || vm.topicModel === t.course_topic) &&
              (!vm.provider.includes(vm.providerModel) || vm.providerModel === t.course_provider) &&
              (!vm.level.includes(vm.levelModel) || vm.levelModel === t.course_level)) {
              return t;
            }
          });
        } else {
          vm.filterDate = angular.copy(vm.cacheItems);
        }
        vm.groups = [];
        vm.groups = _.chunk(angular.copy(vm.filterDate).slice(0, 3), 3);
      };
    }
  });
