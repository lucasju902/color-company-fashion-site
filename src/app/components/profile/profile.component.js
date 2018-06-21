angular
  .module('app')
  .component('profileComponent', {
    templateUrl: 'app/components/profile/profile.tmpl.html',
    controller: function ($state, $http, appConfig, categoryValues, dataValidate, localStorageService, authService, $scope, $q, $timeout) {
      var vm = this;

      vm.job_function = categoryValues('job function');
      vm.country = categoryValues('country');
      vm.industry = categoryValues('industry');
      vm.company_size = categoryValues('company size');
      vm.editFlag = false;
      vm.fileFlag = true;

      $scope.uploadme;

      $scope.uploadImage = function () {
        // var fd = new FormData();
        // var imgBlob = dataURItoBlob($scope.uploadme);
        // fd.append('file', imgBlob);
        // $http.put(appConfig.dashboardServiceUrl + 'members/' + vm.userID, {id: vm.userID, image: fd}, {transformRequest: angular.identity})
        //   .then(function (res) {
        //     if (res.status !== 200) {
        //       console.log(res);
        //     }
        //   });
      };

      // $scope.add = function (e) {
      //   vm.file = e.files[0];
      //   $timeout(function () {
      //     vm.fileFlag = true;
      //   }, 1000);
      // };
      //
      // vm.uploadPhoto = function () {
      //   var formData = new FormData();
      //   var imgBlob = dataURItoBlob(vm.file);
      //   formData.append('image', imgBlob, vm.file.name);
      //   $http.put(appConfig.dashboardServiceUrl + 'members/' + vm.userID, {id: vm.userID, image: formData})
      //     .then(function (res) {
      //       if (res.status !== 200) {
      //         console.log(res);
      //       }
      //     });
      // };

      function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
          type: mimeString
        });
      }

      vm.init = function () {
        authService.loadCurrentUser().then(function (res) {
          vm.userID = res.data.user.id;
          $http.get(appConfig.dashboardServiceUrl + 'members/' + vm.userID + '.json')
            .then(function (res) {
              if (res && res.data) {
                vm.userData = res.data;
                vm.date = moment(vm.userData.date_year + '-' + vm.userData.date_month + '-' + vm.userData.date_day).format('YYYY-MM-DD');
                vm.img_url = 'http://s3.amazonaws.com/hue-storage/huegroup-website/about_vertical_coverages/image1s/000/000/001/original/HG_REPORT-V1-image.001.jpeg?1523632810';

                vm.indexes = {
                  job_function: vm.searchIndex(vm.job_function, vm.userData.job_function),
                  company_size: vm.searchIndex(vm.company_size, vm.userData.company_size),
                  country: vm.searchIndex(vm.country, vm.userData.country),
                  industry: vm.searchIndex(vm.industry, vm.userData.industry)
                };
                vm.intEditData();
              }
            });
        });
      };

      vm.intEditData = function () {
        vm.data = {
          first_name: {value: vm.userData.first_name, required: true, name: 'first name', type: 'provide'},
          last_name: {value: vm.userData.last_name, required: true, name: 'last name', type: 'provide'},
          email: {value: vm.userData.email, required: true, name: 'email', type: 'provide'},
          company: {value: vm.userData.company, required: true, name: 'company name', type: 'provide'},
          job_title: {value: vm.userData.job_title, required: true, name: 'job title', type: 'provide'},
          bio: {value: vm.userData.bio, name: 'bio', type: 'provide'},
          job_function: {
            value: vm.job_function[vm.indexes.job_function] || vm.userData.job_function,
            required: true,
            name: 'job function',
            type: 'select'
          },
          company_size: {
            value: vm.company_size[vm.indexes.company_size] || vm.userData.company_size,
            required: true,
            name: 'company size',
            type: 'select'
          },
          industry: {
            value: vm.industry[vm.indexes.country] || vm.userData.industry,
            required: true,
            name: 'industry',
            type: 'select'
          },
          country: {value: vm.country[vm.indexes.industry] || vm.userData.country,
            required: true,
            name: 'country',
            type: 'select'
          }
        };
      };

      vm.searchIndex = function (arr, value) {
        return _.findIndex(arr, function (item) {
          return item.title === value;
        });
      };

      vm.goCart = function () {
        $state.go('cart-page', {wayBack: 'profile'});
      };

      vm.cancel = function () {
        vm.editFlag = false;
        vm.intEditData();
      };

      vm.save = function () {
        if (dataValidate.validate(vm.data)) {
          var data = {};
          for (var item in vm.data) {
            if (vm.data[item].type === 'select') {
              data[item] = vm.data[item].value.title;
            } else {
              data[item] = vm.data[item].value;
            }
          }
          data.flag = 'profile';
          $http.put(appConfig.dashboardServiceUrl + 'members/' + vm.userID, data)
            .then(function (res) {
              if (res.status !== 200) {
                console.log(res);
              }
            });
          vm.editFlag = false;
        }
      };

      vm.editProfile = function () {
        for (var key in vm.indexes) {
          if (vm.indexes[key] < 0) {
            vm.data[key].value = vm[key][0];
          }
        }
        vm.editFlag = true;
      };
    }
  });
