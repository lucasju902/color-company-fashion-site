angular.module('app').service('searchColor', ['$location', function (location ) {
    var savedData = {}
    function set(data, colorName, colorRGB) {
        savedData = [data, colorName, colorRGB];
    }
    function get() {
        return savedData;
    }
    return {
        set: set,
        get: get
    }
}]);
