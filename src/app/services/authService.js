angular.module('app')
  .service('authService', ['$http', '$cookies', '$window', 'appConfig', '$rootScope', '$state',
    function ($http, $cookies, $window, appConfig, $rootScope, $state) {
      var self = this;
      this.token = $cookies.get('hg_session');

      this.login = function (username, password) {
        return $http.get(appConfig.authServiceUrl + '/api/login', {
          params: {
            username: username,
            password: password,
            app: 'huefashion'
          }
        }).then(function (res) {
          if (res.data && res.data.success) {
            self.setToken(res.data.token);
            self.currentUser = res.data.user;
            self.token = res.data.token;
            $rootScope.currentUser = res.data.user;
          }
          return res.data;
        });
      };

      this.logOut = function () {
        $http.get(appConfig.authServiceUrl + '/api/logout', {params: {token: self.token}})
          .then(function (res) {
            if (res.data && res.data.success) {
              $cookies.remove('hg_session');
              self.token = null;
              self.currentUser = {};
              $rootScope.currentUser = {};
              $state.go('aboutPage');
            }
          });
      };

      this.loadCurrentUser = function () {
        return $http.get(appConfig.authServiceUrl + '/api/user',
          {params: {app: appConfig.appName, token: self.token}})
          .then(function (data) {
            if (data.data.success) {
              self.currentUser = data.data.user;
              $rootScope.currentUser = data.data.user;
            } else {
              $rootScope.currentUser = {};
            }
            return data;
          });
      };

      this.getCurrentUser = function () {
        return self.currentUser || {}
      };

      this.setToken = function (token) {
        var date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        $cookies.put('hg_session', token, {expires: date});
        this.token = token;
      };
    }]);
