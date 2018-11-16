angular
  .module('app')
  .component('colorIndexComponent', {
    templateUrl: 'app/components/color-index/color-index.tmpl.html',
    controller: function ($location, anchorSmoothScroll) {
      var vm = this;
// console.log($location.hash('prefooter'));
      vm.gotoElement = function (eID) {
        $location.hash('prefooter');
        anchorSmoothScroll.scrollTo(eID);
        $location.hash('');
      };

      // vm.getUser = function () {
      //     return localStorageService.get('currentUser').id === undefined;
      // };
    }
  });
