angular.module('app').directive('autocomplete', ['searchMenuRepository', function(searchMenuRepository) {
	function link(scope, element, attrs) {
		//config
		scope.filteredChoices = [];
		scope.isVisible = {
			suggestions: false
		};

		scope.filterItems = function () {
			if (scope.enteredText.length > 0) {
				var params = {};

				if (scope.selectType == 'brand') {
					scope.selectType = "company";
				}
				params[scope.selectType + '_title'] = scope.enteredText;

				searchMenuRepository.getControlsDataBranding(params).then(function (data) {

					var item_index = 'companies';


					if (scope.selectType == 'industry') {
						item_index = "industries";
					} else if (scope.selectType == 'attribute') {
						item_index = "attributes";
					}

					var data_entry = data[item_index];
					for (item in data_entry) {
						data_entry[item].index = item;
					}

					scope.filteredChoices = data_entry;
					scope.isVisible.suggestions = scope.filteredChoices.length > 0 ? true : false;
				});
			} else {
				scope.isVisible.suggestions = false;
			}
		};


		/**
		 * Takes one based index to save selected choice object
		 */
		scope.selectItem = function(choice) {
			scope.selectedValue = choice;
			scope.enteredText = choice.title;
			scope.isVisible.suggestions = false;
			scope.selectHandle(scope.selectType, choice);
		};
	}

	return {
		restrict: 'E',
		link: link,
		templateUrl: 'app/directives/dbAutoComplete/dbAutoCompleteView.html',
		scope: {
			enteredText: '=',
			selectedValue: '=',
			placeholder: '=',
			selectHandle: '=',
			selectType: '='
		}
	}
}]);
