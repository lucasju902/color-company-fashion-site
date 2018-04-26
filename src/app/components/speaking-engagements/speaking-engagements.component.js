angular
  .module('app')
  .component('speakingEngagementsComponent', {
    templateUrl: 'app/components/speaking-engagements/speaking-engagements.tmpl.html',
    controller: function ($http, appConfig) {
      var vm = this;
      vm.lastName = '';
      vm.firstName = '';
      vm.jobTitle = '';
      vm.email = '';
      vm.company = '';
      vm.request = '';
      vm.message = '';
      vm.pageData = {};
      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'about_add_speakers.json')
          .then(function (res) {
            if (res && res.data) {
              vm.pageData = angular.copy(res.data);
            }
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
        var forSend = {
          firstName: vm.firstName,
          lastName: vm.lastName,
          email: vm.email,
          jobtitle: vm.jobTitle,
          company: vm.company,
          request: vm.request,
          message: vm.message
        };
        $http.get(appConfig.dashboardServiceUrl + 'speaking_engagements', {
          params: forSend
        }).then(function (res) {
          if (res.data.status === 'ok') {
            $window.location.href = '#!/thank-youspeaking';
          }
        });
      };
    }
  });
