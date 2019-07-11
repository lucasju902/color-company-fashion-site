angular.module('app').directive('autocomplete', [
  '$timeout', 'searchMenuRepository', function(timeout, searchMenuRepository) {
    function link(scope, element, attrs) {
      //config
      scope.filteredChoices = [];
      scope.isVisible = {
        suggestions: false
      };
      
      scope.filterItems = function () {
        if (scope.minlength <= scope.enteredtext.length) {
          var params = {};

          if (scope.selecttype == 'brand') {
            scope.selecttype = "company";
          }
          params[scope.selecttype + '_title'] = scope.enteredtext;

          searchMenuRepository.getControlsDataBranding(params).then(function(data) {

            var item_index = 'companies';


            if (scope.selecttype == 'industry') {
              item_index = "industries";
            } else if (scope.selecttype == 'attribute') {
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
      scope.selectItem = function (choices) {
        scope.selected = choices;
        scope.enteredtext = choices.title;
        scope.isVisible.suggestions = false;
        scope.selecthandle(scope.selecttype, choices);
      };
      
      
      /**
       * Search for states... use $timeout to simulate
       * remote dataservice call.
       */
      function querySearch (query) {

        // returns list of filtered items
        return  query ? scope.choices.filter( createFilterFor(query) ) : [];
      }
      
      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);


        return function filterFn(item) {
          // Check if the given item matches for the given query
        var label = angular.lowercase(item.title);
          return (label.indexOf(lowercaseQuery) === 0);
        };
      }
    }

    return {
      restrict: 'E',
      link:link,
      templateUrl: 'app/directives/dbAutoComplete/dbAutoCompleteView.html',
      scope: {
        choices: '=',
        enteredtext: '=',
        minlength: '=',
        selected: '=',
        placeholder:'=',
        selecthandle:'=',
        selecttype:'='
      }
    }
  }
]);

