angular.module('app').directive('hueDbDesignerImages',
  ['$timeout', 'dashboardRepository', function (timeout, dashboardRepository) {
    function link(scope, element, attrs) {
      scope.data = [];
      scope.collectionData = [];
      scope.showCollection = false;
      scope.showImageDetails = false;
      scope.collectionLoading = false;
      scope.imageDetailsData = null;
      window.scr = scope

      scope.openFullCollection = function (index) {
        // if (scope.collectionLoading)
        //   return;
        scope.collectionData = [];
        dashboardRepository.designer.getDesignerImages(scope.data[index].id, scope.menus)
          .then(function (data) {
            scope.collectionLoading = false;
            scope.collectionData = data;
            timeout(function () {
              scope.showCollection = true;
            }, 300);
          });
        scope.collectionLoading = true;
      };

      scope.closeFullCollection = function () {
        scope.showCollection = false;
        adjustPreviewData();
      };

      scope.toggleImageDetails = function () {
        scope.showImageDetails = scope.showImageDetails ? false : true;
      };

      scope.imageClickHandler = function (index) {
        // scope.imageDetailsData = scope.singleDesigner ? scope.data[index] : scope.collectionData[index];
        let data = {
          index: index,
          data: []
        };
        if (scope.singleDesigner) {
          data.data = scope.data;
        } else {
          data.data = scope.collectionData;
        }
        scope.imageDetailsData = data;
        scope.toggleImageDetails();
      };

      var imagesContainer = $('.db-designer-images', element);
      var adjustPreviewData = function () {
        var elemCount = 12;
        scope.data = scope.originalData.slice(0, elemCount);
      };

      $(window).resize(function (event) {
        if (!scope.isExpanded) {
          adjustPreviewData();
          scope.$digest();
        }
      });

      scope.$watch('originalData', function (newValue, oldValue) {
        adjustPreviewData();
      });

      scope.$watch('isExpanded', function (newValue, oldValue) {
        scope.showCollection = false;

        if (newValue)
          scope.data = scope.originalData;
        else
          adjustPreviewData();
      });
    }

    return {
      restrict: 'E',
      templateUrl: 'app/directives/dbDesignerImages/dbDesignerImagesView.html',
      link: link,
      scope: {
        originalData: '=data',
        isExpanded: '=',
        singleDesigner: '=',
        yearId: '=',
        seasonId: '=',
        categoryId: '=',
        cityId: '=',
        regionId: '=',
        colorId: '=',
        menus: '='
      }
    };
  }]);
