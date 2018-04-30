angular
  .module('app')
  .component('speakingEngagementsComponent', {
    templateUrl: 'app/components/speaking-engagements/speaking-engagements.tmpl.html',
    controller: function ($window, $http, appConfig, dataValidate) {
      var vm = this;
      vm.pageData = {};

      vm.data = {
        firstName: {value: '', required: true, name: 'first name', type: 'provide'},
        lastName: {value: '', required: true, name: 'last name', type: 'provide'},
        email: {value: '', required: true, name: 'email', type: 'provide'},
        company: {value: '', required: true, name: 'company name', type: 'provide'},
        jobTitle: {value: '', required: true, name: 'job title', type: 'provide'},
        request: {value: '', required: true, name: 'request', type: 'enter'},
        message: {value: '', required: true, name: 'message', type: 'enter'}
      };

      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'about_add_speakers.json')
          .then(function (res) {
            if (res && res.data) {
              vm.pageData = angular.copy(res.data);
            }
            vm.groups = _.chunk(angular.copy(vm.pageData), 3);
          });
        $http.get(appConfig.dashboardServiceUrl + 'about_speaking_engagements.json')
          .then(function (res) {
            if (res && res.data) {
              vm.pageData.title = res.data['0'].title;
              vm.pageData.editor = res.data['0'].editor;
            }
          });
      };
      vm.speaking = function () {
        if (dataValidate.validate(vm.data)) {
          var data = {};
          for (var item in this.data) {
            data[item] = this.data[item].value;
          }
          $http.get(appConfig.dashboardServiceUrl + 'speaking_engagements', {
            params: data
          }).then(function (res) {
            if (res.data.status === 'ok') {
              $window.location.href = '#!/thank-youspeaking';
            }
          });
        }
      };
    }
  });
