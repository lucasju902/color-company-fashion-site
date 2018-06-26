angular
  .module('app')
  .component('appHeader', {
    templateUrl: 'app/header.html',
    controller: function ($state, authService, $rootScope, $scope, localStorageService) {
      var self = this;
      this.navigations = [
        {
          name: 'About',
          subNavs: [
            {name: 'About', state: 'aboutPage'},
            {name: 'Huegroup Vertical Coverage', state: 'verticalCoverage'},
            {name: 'Huegroup Members', state: 'members'},
            {name: 'Speaking Engagements', state: 'speakingEngagements'},
            {name: 'Publication Schedule', state: 'publicationSchedule'}
          ]
        }, {
          name: 'Color Trends',
          subNavs: [
            {name: 'Fashion Color Trends', state: 'fashion'},
            {name: 'Auto Color Trends', state: 'auto'},
            {name: 'Brand Color Trends', state: 'branding'},
            {name: 'Legal Color Trends', state: 'legal'}
          ]
        }, {
          name: 'Color Research',
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
          name: 'Color Daily',
          subNavs: [
            {name: 'Blog', state: 'dailyInsights'}
          ]
        }, {
          name: 'Contact',
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
        $state.go('profile');
      };

      this.goToLanding = function () {
        $state.go('landing');
      };

      $scope.$watch(function () {
        return authService.currentUser;
      }, function (newVal) {
        self.user = localStorageService.get('currentUser');
      });

      this.hideHeader = function () {
        return $state.current.name === 'landing';
      };
    }
  });
