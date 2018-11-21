angular
  .module('app')
  .component('colorIndexAccordionComponent', {
    templateUrl: 'app/components/color-index-accordion/color-index-accordion.tmpl.html',
    controller: function ($location, $scope, anchorSmoothScroll) {
      var vm = this;
      vm.gotoElement = function (eID) {
        $location.hash('prefooter');
        anchorSmoothScroll.scrollTo(eID);
        $location.hash('');
      };

        $scope.clickItemAccordion = function (item) {
            $scope.accordion.current = item.name;
            $scope.isOpen = !$scope.isOpen;
        }

        $scope.isOpen = false;
        $scope.accordion = {
            current: null
        };

        $scope.items = [{
            name: 'List 1',
            sub: [{
                name: 'Sub 1.1'
            }]
        }, {
            name: 'List 2',
            sub: [{
                name: 'Sub 2.1'
            }]
        }, {
            name: 'List 3',
            sub: [{
                name: 'Sub 3.1'

            }]
        }];
    }
  });
