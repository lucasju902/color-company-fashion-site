angular
  .module('app')
  .component('appHeader', {
    templateUrl: 'app/header.html',
    controller: function ($state, authService, $rootScope, $scope) {
      var self = this;
      this.navigations = [
        {
          name: 'ABOUT',
          subNavs: [
            {name: 'About', state: 'aboutPage'},
            {name: 'Huegroup Vertical Coverage', state: 'verticalCoverage'},
            {name: 'Huegroup Members', state: 'members'},
            {name: 'Speaking Engagements', state: 'speakingEngagements'},
            {name: 'Publication Schedule', state: 'publicationSchedule'}
          ]
        }, {
          name: 'COLOR TRENDS',
          subNavs: [
            {name: 'Fashion Color Trends', state: 'fashion'},
            {name: 'Auto Color Trends', state: 'auto'},
            {name: 'Brand Color Trends', state: 'branding'},
            {name: 'Legal Color Trends', state: 'legal'}
          ]
        }, {
          name: 'COLOR RESEARCH',
          subNavs: [
            {name: 'Color Indices', state: 'colorEmotion'},
            {name: 'Color Reports', state: 'reports'},
            {name: 'Color Infographics', state: 'infographics'},
            {name: 'Color Customized Infographics', state: 'customizedInfographics'},
            {name: 'Color Courses', state: 'courses'},
            {name: 'Color Teaching Materials', state: 'teachingMaterials'},
            {name: 'Good Reads', state: 'goodReads'}
          ]
        }, {
          name: 'COLOR DAILY',
          subNavs: [
            {name: 'Blog', state: 'dailyInsights'}
          ]
        }, {
          name: 'CONTACT',
          subNavs: [
            {name: 'Contact Form', state: 'contact'},
            {name: 'Membership Inquiry', state: 'membership'},
            {name: 'Members Analytics', state: 'membersAnalytics'},
            {name: 'Data Partnership Inquiry', state: 'partners'}
          ]
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

      this.goProfile = function () {
        $state.go('profile', {id: $rootScope.currentUser.id});
      }

      $scope.$watch(function () {
        return $rootScope.currentUser;
      }, function (newVal) {
        self.user = $rootScope.currentUser;
      });
    }
  });
