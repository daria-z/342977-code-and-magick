'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // массив имен магов
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
});

setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
});


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
