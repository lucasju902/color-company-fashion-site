angular.module('app').service('dataValidate', function (modalService) {
  this.validate = function (data) {
    var errorMessage = [];
    var types = {
      provide: '*Please provide your ',
      select: '*Please select ',
      enter: '*Please enter your '
    };

    for (var item in data) {
      if (data[item].required && data[item].value === '') {
        var type = types[data[item].type] || '*Please enter ';
        errorMessage.push(type + data[item].name);
      }
    }
    if (errorMessage.length !== 0) {
      modalService.showModal(0, null, errorMessage);
      return false;
    }
    return true;
  };
});
