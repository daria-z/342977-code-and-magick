'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // массив имен магов
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup'); // создали переменную-блок настройки персонажа в которой будем работать
// userDialog.classList.remove('hidden'); // показали блок настройки персонажа

var similarListElement = userDialog.querySelector('.setup-similar-list'); //  переменная в которую сложим сгенерированные элементы

var wizardTemplate = document.querySelector('#similar-wizard-template') // создаем шаблон?
    .content // обращаемся к обертке
    .querySelector('.setup-similar-item'); // и к элементам внутри обертки

var wizards = []; // массив волшебники

var getRandomNumber = function (lengthOfArray) {
  return Math.floor(Math.random() * lengthOfArray);
};

var createWizardLook = function () { // генерирует 4 объекта внешнего вида волшебников
  for (var i = 0; i < 4; i++) {
    var wizardLook = {
      name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length)],
      coatColor: COAT_COLORS[getRandomNumber(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[getRandomNumber(EYES_COLORS.length)]
    };

    wizards.push(wizardLook); // записали в массив wizards
  }
};

var renderWizard = function (wizard) { // функция для генирации волшебника из массива
  var wizardElement = wizardTemplate.cloneNode(true); // копируем теиплейт волшебника

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // добавили имя из массива
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // добавили цвет плаща из массива
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment(); // создание фрагмента для вставки
createWizardLook();
for (var i = 0; i < wizards.length; i++) { // проходимся по всему массиву
  fragment.appendChild(renderWizard(wizards[i])); // добавляем элемент во фрагмент
}
similarListElement.appendChild(fragment); // добавляем сгенерированный фрагмент (все элементы разом) в DOM

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими волшебниками

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () { // проверка на валидность форм
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  }
});

userNameInput.addEventListener('input', function (evt) { // проверка минимальной длинны для Edge
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.top = '';
  setup.style.left = '';
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});


var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIERBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var eyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
var fireballColor = setup.querySelector('.setup-fireball-wrap');
var eyesColorInput = setup.querySelector('.setup-wizard-appearance input');
var fireballColorInput = setup.querySelector('.setup-fireball-wrap input');

var eyesColorChange = function () {
  var randomEyesColor = WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length)];
  eyesColor.style.fill = randomEyesColor;
  eyesColorInput.value = randomEyesColor;
};

var fireballColorChange = function () {
  var randomFireballColor = FIERBALL_COLORS[getRandomNumber(FIERBALL_COLORS.length)];
  fireballColor.style.backgroundColor = randomFireballColor;
  fireballColorInput.value = randomFireballColor;
};

eyesColor.addEventListener('click', function () {
  eyesColorChange();
});

fireballColor.addEventListener('click', function () {
  fireballColorChange();
});


var dialogHandle = setup.querySelector('.upload .setup-user-pic');

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var shopElement = document.querySelector('.setup-artifacts-shop .setup-artifacts-cell');
var draggedItem = null;

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
});

var artifactsElement = document.querySelector('.setup-artifacts');
var artifactsCell = document.querySelector('.setup-artifacts .setup-artifacts-cell:first-of-type');
var shopCell = document.querySelector('.setup-artifacts-shop .setup-artifacts-cell:first-of-type');

shopElement.addEventListener('dragstart', function () {
  artifactsCell.style.outline = '2px dashed red';
});

artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('drop', function (evt) {
  if (evt.target !== artifactsCell) {
    shopCell.appendChild(draggedItem);
  } else {
    evt.target.appendChild(draggedItem);
  }
  evt.target.style.backgroundColor = '';
  evt.target.style.outline = '';
  evt.preventDefault();
});


artifactsElement.addEventListener('dragenter', function (evt) {
  evt.target.style.backgroundColor = 'yellow';
  evt.target.style.outline = '';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.target.style.outline = '';
  evt.preventDefault();
});
