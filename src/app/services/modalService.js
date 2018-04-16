angular.module('app').service('modalService', function ($rootScope, $uibModal) {
  this.showModal = function (number, img) {
    var arr = [
      {
        tmpl: 'app/components/modal/modal.tmpl.html',
        class: 'modal-err'
      },
      {
        tmpl: 'app/components/modal/membersOnlyModal.tmpl.html',
        class: 'adv-modal'
      },
      {
        tmpl: 'app/components/modal/graphic-modal.tmpl.html',
        class: 'graphic-modal'
      }];

    $uibModal.open({
      templateUrl: arr[number].tmpl,
      // size: size,
      controller: function ($scope, $uibModalInstance) {
        $scope.ok = function () {
          $uibModal.close();
        };
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.img = img;
      },
      windowTopClass: arr[number].class,
      resolve: {}
    }).result.then(function(){}, function(res){});
  }
});
