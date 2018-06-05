angular
  .module('app')
  .component('profileComponent', {
    templateUrl: 'app/components/profile/profile.tmpl.html',
    controller: function ($state, $http, appConfig, $stateParams, categoryValues, dataValidate) {
      var vm = this;

      vm.jobs = categoryValues('job function');
      vm.countries = categoryValues('country');
      vm.industries = categoryValues('industry');
      vm.companySizes = categoryValues('company size');

      vm.data = {
        first_name: {value: '', required: true, name: 'first name', type: 'provide'},
        last_name: {value: '', required: true, name: 'last name', type: 'provide'},
        // email: {value: '', required: true, name: 'email', type: 'provide'},
        company: {value: '', required: true, name: 'company name', type: 'provide'},
        job_title: {value: '', required: true, name: 'job title', type: 'provide'},
        bio: {value: '', required: true, name: 'bio', type: 'provide'},
        job_function: {value: vm.jobs[0], required: true, name: 'job function', type: 'select'},
        company_size: {value: vm.companySizes[0], required: true, name: 'company size', type: 'select'},
        industry: {value: vm.industries[0], required: true, name: 'industry', type: 'select'},
        country: {value: vm.countries[0], required: true, name: 'country', type: 'select'}
        // permissions: {daily: true, research: true, edu: true},
        // relationship: {expert: true}
      };

      vm.editFlag = false;
      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'members/' + $stateParams.id + '.json')
          .then(function (res) {
            if (res && res.data) {
              vm.userData = res.data;
              vm.date = vm.userData.date_day + ' : ' + vm.userData.date_month + ' : ' + vm.userData.date_year;
              vm.img_url = vm.data.image_file_name || 'http://s3.amazonaws.com/hue-storage/huegroup-website/about_vertical_coverages/image1s/000/000/001/original/HG_REPORT-V1-image.001.jpeg?1523632810'
            }
          });
      };

      vm.goCart = function () {
        $state.go('cart-page');
      }

      vm.cancel = function () {
        vm.editFlag = false;
      };

      vm.save = function () {
        // if (dataValidate.validate(vm.data)) {
        var data = {};
        for (var item in vm.data) {
          if (vm.data[item].type === 'select') {
            data[item] =
              (!~vm.data[item].value.title.indexOf('PLEASE SELECT')) ? vm.data[item].value.title : vm.userData[item];
          } else {
            data[item] = vm.data[item].value || vm.userData[item];
          }
        }
        $http.put(appConfig.dashboardServiceUrl + 'members/' + $stateParams.id + '.json', {
          data: data
        }).then(function (res) {
          if (res.status === 200) {
            console.log('ok ');
          }
        });
        vm.editFlag = false;
        // }
      };

      vm.editProfile = function () {
        vm.editFlag = true;
      };
    }
  });
