angular
  .module('app')
  .component('detailedComponent', {
    templateUrl: 'app/components/detailed-page/detailed.tmpl.html',
    controller: function ($location, anchorSmoothScroll) {
      var vm = this;

      vm.gotoElement = function (eID) {
        $location.hash('prefooter');
        anchorSmoothScroll.scrollTo(eID);
        $location.hash('');
      };
    }
  });
