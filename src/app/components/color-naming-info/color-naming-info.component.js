angular
  .module('app')
  .component('colorNamingInfoComponent', {
    templateUrl: 'app/components/color-naming-info/color-naming-info.tmpl.html',
    controller: function ($location, anchorSmoothScroll) {
      var vm = this;
      vm.gotoElement = function (eID) {
        $location.hash('prefooter');
        anchorSmoothScroll.scrollTo(eID);
        $location.hash('');
      };
    }
  });
