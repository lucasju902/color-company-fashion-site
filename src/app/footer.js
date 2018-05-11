angular
  .module('app')
  .component('appFooter', {
    templateUrl: 'app/footer.html',
    controller: function ($state, $scope, $stateParams, scrollService, modalService, $http, appConfig) {
      this.email = '';
      this.permissions = {
        'Daily Insights': false,
        'Research Partner': false,
        'Education Offerings': false
      };
      this.relationship = {
        'Expert Panelist': false
      };

      this.modalUpdate = function (number) {
        modalService.showModal(number)
      };

      this.scroll = function () {
        scrollService.scrollMember()
      };

      this.submitEmail = function () {
        var data = {
          email: this.email,
          permissions: []
        };

        for (var i in this.permissions) {
          if (this.permissions[i]) {
            data.permissions.push(i);
          }
        }
        if (this.relationship['Expert Panelist']) {
          data.relationship = 'Expert Panelist';
        }
        data.permissions = JSON.stringify(data.permissions);
        $http.get(appConfig.dashboardServiceUrl + 'new_member_email', {
          params: data
        }).then(function () {
          this.email = '';
        });
      };

      this.hidePrefooter = function () {
        return $state.current.name === 'login' ||
          $state.current.name === 'privacy' ||
          $state.current.name === 'contact' ||
          $state.current.name === 'terms' ||
          $state.current.name === 'recover' ||
          $state.current.name === 'password-recover' ||
          $state.current.name === 'press';
      };
    }
  });
