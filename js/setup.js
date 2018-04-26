'use strict';

(function () {
  window.util.userNameInput.addEventListener('invalid', function () { // проверка на валидность форм
    if (window.util.userNameInput.validity.tooShort) {
      window.util.userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (window.util.userNameInput.validity.tooLong) {
      window.util.userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (window.util.userNameInput.validity.valueMissing) {
      window.util.userNameInput.setCustomValidity('Обязательное поле');
    }
  });

  window.util.userNameInput.addEventListener('input', function (evt) { // проверка минимальной длинны для Edge
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var WIZARD_EYES_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var FIERBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var eyesColor = window.util.setup.querySelector('.setup-wizard .wizard-eyes');
  var fireballColor = window.util.setup.querySelector('.setup-fireball-wrap');
  var eyesColorInput = window.util.setup.querySelector('.setup-wizard-appearance input');
  var fireballColorInput = window.util.setup.querySelector('.setup-fireball-wrap input');

  var eyesColorChange = function () {
    var randomEyesColor = WIZARD_EYES_COLORS[window.util.getRandomNumber(WIZARD_EYES_COLORS.length)];
    eyesColor.style.fill = randomEyesColor;
    eyesColorInput.value = randomEyesColor;
  };

  var fireballColorChange = function () {
    var randomFireballColor = FIERBALL_COLORS[window.util.getRandomNumber(FIERBALL_COLORS.length)];
    fireballColor.style.backgroundColor = randomFireballColor;
    fireballColorInput.value = randomFireballColor;
  };

  eyesColor.addEventListener('click', function () {
    eyesColorChange();
  });

  fireballColor.addEventListener('click', function () {
    fireballColorChange();
  });

  var form = window.util.setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      window.util.setup.classList.add('hidden');
    });
  });
})();
