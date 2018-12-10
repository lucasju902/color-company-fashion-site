angular.module('app').service('searchColor', ['$location', function (location ) {
    var savedData = {}
    function set(data, colorName) {
        savedData = [data, colorName];
    }
    function get() {
        return savedData;
    }
    return {
        set: set,
        get: get
    }
}]);
