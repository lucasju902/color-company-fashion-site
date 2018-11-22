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
            name: '37 COLOR ASSOCIATION NAMES',
            sub: [{
                name: 'Test'
            }]
        }, {
            name: '22 PAINT COLOR NAMES',
            sub: [{
                name: 'Sub 2.1'
            }]
        }, {
            name: '139 COLOURLOVERS COLOR NAMES',
            sub: [{
                name: 'Sub 3.1'
            }]
        }, {
            name: '18 RESEARCH COLOR NAMES',
            sub: [{
                name: 'Sub 3.1'

            }]
        }, {
            name: 'COLOR MOSAIC FOR (COLOR NAME)',
            sub: [{
                name: '<img class="img-accordion img-responsive img50" alt="Image" ng-src="http://s3.amazonaws.com/huestorage/huegroup-website/infographic_infographic_files/infographic_files/000/000/035/original/CO2a.RTW.FW.17.AllRe.MI.07_27_2018.jpg?1532744790" src="http://s3.amazonaws.com/huestorage/huegroup-website/infographic_infographic_files/infographic_files/000/000/035/original/CO2a.RTW.FW.17.AllRe.MI.07_27_2018.jpg?1532744790">'

            }]
        }];
    }
  });
