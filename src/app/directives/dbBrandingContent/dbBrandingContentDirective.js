angular.module('app').directive('brandingcontent', [
	'$timeout', 'dashboardRepository', 'searchMenuRepository',function (timeout, dashboardRepository,searchMenuRepository) {
		function link(scope, element, attrs) {
			scope.data = [];
			scope.showCollection = false;
			scope.showImageDetails = false
			scope.imageDetailsData = null;
			window.scr = scope
			scope.collectionDataList = [];

			for(item in scope.companies)
			{
				scope.companies[item].logo_url = "http://huestorage.s3.amazonaws.com" + scope.companies[item].logo_url;
			}


			scope.toggleImageDetails = function () {
				console.log(scope.showImageDetails);
				scope.showImageDetails = scope.showImageDetails ? false : true;
			};

			scope.imageClickHandler = function (index) {

				var imagedata = scope.companies[index];
				let data = {
					index: index,
					data: []
				};

				imagedata.image_src = "http://huestorage.s3.amazonaws.com/" + imagedata.logo_url;
				// calc by page num
				data.index = scope.page_num * scope.page_limit + index;
				scope.imageDetailsData = imagedata;
				scope.toggleImageDetails();
			};

		}

		return {
			restrict: 'E',
			templateUrl: 'app/directives/dbBrandingContent/dbBrandingContentView.html',
			link: link,
			scope: {
				originalData: '=data',
				companies:"="
			}
		};
	}
]);
