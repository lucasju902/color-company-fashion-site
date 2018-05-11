angular
  .module('app')
  .component('loginComponent', {
    templateUrl: 'app/components/login/login.tmpl.html',
    controller: function (authService, $state) {
      var self = this;
      this.email = '';
      this.password = '';
      this.isRemembered = false;
      this.error = '';

      this.login = function () {
        self.error = false;
        authService.login(this.email, this.password, this.isRemembered)
          .then(function (data) {
            if (data && data.success) {
              $state.go('aboutPage');
            } else {
              self.error = true;
            }
          });
      };
    }
  });
