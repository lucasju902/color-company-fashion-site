angular.module('app').directive('brandingdetail', function ($timeout, searchMenuRepository, userDataRepository, mainMenuService, authService,$rootScope) {
  function link(scope, element, attrs,rootScope) {
    scope.allData = scope.data;
    //scope.data = scope.allData.data[scope.allData.index];

    //social_link_start
    scope.closeClickHandler = function () {
      scope.closefunction();
    };

    scope.shareFacebook = function (url) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + url);
    }

    scope.shareTwitter = function (url) {
      window.open('https://twitter.com/home?status=' + url);
    }

    scope.sharePinterest = function (url) {
      window.open('https://pinterest.com/pin/create/button/?url=' + url);
    }

    scope.shareGooglePlus = function (url) {
      window.open('https://plus.google.com/share?url=' + url);
    }
    //social_link_end
    // scope.LeftButtonHandler = function () {
    //   let index = scope.allData.index;
    //   if (index > 0) {
    //     index--;
    //   }
    //   scope.allData.index = index;
    //   scope.data = scope.allData.data[index];
    // };

    // scope.RightButtonHandler = function () {
    //   try {
    //     let index = scope.allData.index;
    //     if (index < scope.allData.data.length - 1) {
    //       index++;
    //     }
    //     scope.allData.index = index;
    //     scope.data = scope.allData.data[index];
    //   } catch (e) {}
    // }
  }

  return {
    restrict: 'E',
    templateUrl: 'app/directives/dbBrandingContent/dbBrandingContentDetailsView.html',
    link: link,
    scope: {
      data: '=',
      onClose: '&',
      closefunction:"="
    }
  };
});
