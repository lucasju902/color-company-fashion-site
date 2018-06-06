angular.module('app')
  .service('authService', ['$http', '$cookies', '$window', 'appConfig', '$state', 'localStorageService',
    function ($http, $cookies, $window, appConfig, $state, localStorageService) {
      var self = this;
      this.token = $cookies.get('hg_session');

      this.login = function (email, password, isRemembered) {
        return $http.get(appConfig.dashboardServiceUrl + 'sessions/login.json', {
          params: {
            email: email,
            password: password
          }
        }).then(function (res) {
          if (res.data && res.data.success) {
            self.setToken(res.data.token, isRemembered);
            self.currentUser = res.data.user;
            self.token = res.data.token;
            localStorageService.set('currentUser', res.data.user);
          }
          return res.data;
        });
      };

      this.logOut = function () {
        $cookies.remove('hg_session');
        self.token = null;
        self.currentUser = {};
        localStorageService.set('currentUser', {});
        $state.go('aboutPage');
      };

      this.loadCurrentUser = function () {
        return $http.get(appConfig.dashboardServiceUrl + 'sessions/user.json',
          {params: {token: self.token}})
          .then(function (data) {
            if (data.data.success) {
              self.currentUser = data.data.user;
              localStorageService.set('currentUser', data.data.user);
            } else {
              localStorageService.set('currentUser', {});
            }
            return data;
          });
      };

      this.getCurrentUser = function () {
        return self.currentUser || {};
      };

      this.setToken = function (token, isRemembered) {
        var date = new Date();
        if (isRemembered) {
          date.setFullYear(date.getFullYear() + 1);
        } else {
          date.setDate(date.getDate() + 1);
        }
        $cookies.put('hg_session', token, {expires: date});
        this.token = token;
      };
    }]);
