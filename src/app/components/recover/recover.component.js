angular
  .module('app')
  .component('recoverComponent', {
    templateUrl: 'app/components/recover/recover.tmpl.html',
    controller: function ($state) {
      this.successRequest = false;
      this.email = '';
      this.error = false;

      this.onSendLoginClick = function () {
        if (this.successRequest) {
          $state.go('login');
        }

        if (this.email === 'anat@huegroup.com') {
          this.successRequest = true;
        } else if (!this.email) {
          this.error = 'The Email field is required';
        } else if (this.email && !this.successRequest) {
          this.error = 'We did not find email you provided in our base';
        }
      };
    }
  });
