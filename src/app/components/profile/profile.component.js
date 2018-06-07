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

      vm.editFlag = false;
      vm.init = function () {
        $http.get(appConfig.dashboardServiceUrl + 'members/' + $stateParams.id + '.json')
          .then(function (res) {
            if (res && res.data) {
              vm.userData = res.data;
              vm.date = vm.userData.date_day + ' : ' + vm.userData.date_month + ' : ' + vm.userData.date_year;
              vm.img_url = 'http://s3.amazonaws.com/hue-storage/huegroup-website/about_vertical_coverages/image1s/000/000/001/original/HG_REPORT-V1-image.001.jpeg?1523632810';

              var jobIndex = vm.searchIndex(vm.jobs, vm.userData.job_function);
              var comSizeIndex = vm.searchIndex(vm.companySizes, vm.userData.company_size);
              var countryIndex = vm.searchIndex(vm.countries, vm.userData.country);
              var industryIndex = vm.searchIndex(vm.industries, vm.userData.industry);

              vm.data = {
                first_name: {value: vm.userData.first_name, required: true, name: 'first name', type: 'provide'},
                last_name: {value: vm.userData.last_name, required: true, name: 'last name', type: 'provide'},
                email: {value: vm.userData.email, name: 'email', type: 'provide'},
                company: {value: vm.userData.company, required: true, name: 'company name', type: 'provide'},
                job_title: {value: vm.userData.job_title, required: true, name: 'job title', type: 'provide'},
                bio: {value: vm.userData.bio, name: 'bio', type: 'provide'},
                job_function: {value: vm.jobs[jobIndex], required: true, name: 'job function', type: 'select'},
                company_size: {value: vm.companySizes[comSizeIndex], required: true, name: 'company size', type: 'select'},
                industry: {value: vm.industries[industryIndex], required: true, name: 'industry', type: 'select'},
                country: {value: vm.countries[countryIndex], required: true, name: 'country', type: 'select'}
              };
            }
          });
      };

      vm.searchIndex = function (arr, value) {
        return _.findIndex(arr, function (item) {
          return item.title === value;
        });
      };

      vm.goCart = function () {
        $state.go('cart-page');
      };

      vm.cancel = function () {
        vm.editFlag = false;
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
          $http.put(appConfig.dashboardServiceUrl + 'members/' + $stateParams.id, data)
            .then(function (res) {
            if (res.status !== 200) {
              console.log(res);
            }
          });
          vm.editFlag = false;
        }
      };

      vm.editProfile = function () {
        vm.editFlag = true;
      };
    }
  });
