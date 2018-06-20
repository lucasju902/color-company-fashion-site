angular
  .module('app')
  .component('loginComponent', {
    templateUrl: 'app/components/login/login.tmpl.html',
    controller: function (authService, $state, localStorageService) {
      var self = this;
      this.email = '';
      this.password = '';
      this.isRemembered = false;
      this.error = '';
      var products = {courses: {}, reports: {}, teaching_materials: {}};
      localStorageService.set('products', products);

      this.login = function () {
        self.error = false;
        authService.login(this.email, this.password, this.isRemembered)
          .then(function (data) {
            if (data && data.success) {
              $state.go('landing');
            } else {
              self.error = true;
            }
          });
      };
    }
  });
