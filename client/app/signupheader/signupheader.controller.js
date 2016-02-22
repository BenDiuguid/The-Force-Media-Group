/**
 * Created by Gavin on 2/3/16.
 */

'use strict';

(function() {

  class SignUpHeaderController {

    constructor(SignUp, toaster) {
      this.SignUp = SignUp;
      this.phoneNumber = undefined;
      this.toaster = toaster;
    }


    createContact() {
      var SignUp = this.SignUp;
      var phoneNumber = this.phoneNumber;
      var toaster = this.toaster;
      var that = this;

      SignUp.createContact(phoneNumber).success(function(data) {

        if(!data.Response.Errors) {
          SignUp.sendConfirmationMessage(phoneNumber).success(function () {
            toaster.pop('success', 'Congratulations!', 'You have been subscribed. You should receive a confirmation text message shortly.');
          });
        }
        else if(data.Response.Errors[0] === 'PhoneNumber: This phone number is already in your contacts list.') {
          toaster.pop('error', 'Oops', 'You have already subscribed to receive text updates from Jarmone.');
        }


      }).then(function() {
        that.phoneNumber = undefined;
      });


    }





  }

  angular.module('fmgApp')
    .controller('SignUpHeaderController', SignUpHeaderController);


})();