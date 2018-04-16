angular
  .module('app')
  .component('appHeader', {
    templateUrl: 'app/header.html',
    controller: function ($state, authService, $rootScope, $scope) {
      var self = this;
      this.navigations = [
        {
          name: 'About',
          subNavs: [
            {name: 'About', state: 'aboutPage'},
            {name: 'HUE Group Vertical Coverage', state: 'verticalCoverage'},
            {name: 'Huegroup Members', state: 'members'},
            {name: 'Speaking Engagements', state: 'speakingEngagements'}
          ]
        }, {
          name: 'Data',
          subNavs: [
            // {name: 'Huegroup Color Emotion Index', state: 'colorEmotion'},
            {name: 'Data Partners', state: 'partners'},
            // {name: 'Detailed Page', state: 'detailedPage'},
            {
              name: 'Dashboard', state: 'dashboards',
              subNavs: [
                {name: 'Fashion', state: 'fashion'},
                {name: 'Auto', state: 'auto'}
              ]
            }
          ]
        }, {
          name: 'Insights',
          subNavs: [
            {name: 'Huegroup Reports', state: 'reports'},
            {name: 'Huegroup Infographics', state: 'infographics'},
            {name: 'Huegroup Customized Infographics', state: 'customizedInfographics'},
            {name: 'Huegroup members analytics', state: 'membersAnalytics'},
            {name: 'Publication Schedule', state: 'publicationSchedule'},
            {name: 'Good Reads', state: 'goodReads'}
          ]
        }, {
          name: 'Education',
          subNavs: [
            {name: 'Huegroup Courses', state: 'courses'},
            {name: 'Teaching Materials', state: 'teachingMaterials'}
          ]
        },{
          name: 'Blog',
          subNavs: [
            {name: 'Daily Insights', state: 'dailyInsights'},
          ]
        }, {
          name: 'Membership', state: 'membership'
        }];
      this.selectedTab = false;
      this.selectedSubTab = [];
      this.user = null;

      this.toggleMenu = function (navName) {
        if (navName !== 'Dashboard') {
          angular.element("#myNavbar").collapse('hide');
        }
      };

      this.open = function () {
        angular.element("#myNavbar").collapse('toggle');
      };

      this.getActiveMainNav = function (stateName) {
        var isActive;
        angular.forEach(this.navigations, function (nav) {
          if (stateName === nav.name && nav.subNavs) {
            angular.forEach(nav.subNavs, function (subNav) {
              if (subNav.state === $state.current.name) {
                isActive = true;
              }
              if (subNav.subNavs) {
                angular.forEach(subNav.subNavs, function (item) {
                  if (item.state === $state.current.name) {
                    isActive = true;
                  }
                });
              }
            });
          }
        });
        return isActive;
      };

      this.userIsLoggedIn = function () {
        return !!Object.keys(self.user).length;
      };

      this.logOut = function () {
        authService.logOut();
      };

      $scope.$watch(function () {
        return $rootScope.currentUser;
      }, function (newVal) {
        self.user = $rootScope.currentUser;
      });
    }
  });
