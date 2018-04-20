'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var userNameInput = setup.querySelector('.setup-user-name');
  window.util = {
    setup: document.querySelector('.setup'),
    userNameInput: userNameInput,
    getRandomNumber: function (lengthOfArray) {
      return Math.floor(Math.random() * lengthOfArray);
    }
  };
})();
