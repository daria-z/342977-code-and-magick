'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // массив имен магов
var COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup'); // создали переменную-блок настройки персонажа в которой будем работать
userDialog.classList.remove('hidden'); // показали блок настройки персонажа

var similarListElement = userDialog.querySelector('.setup-similar-list'); //  переменная в которую сложим сгенерированные элементы

var wizardTemplate = document.querySelector('#similar-wizard-template') // создаем шаблон?
    .content // обращаемся к обертке
    .querySelector('.setup-similar-item'); // и к элементам внутри обертки

var wizards = []; // массив волшебники

var createWizardLook = function () { // генерирует 4 объекта внешнего вида волшебников
  for (var i = 0; i < 4; i++) {
    var wizardLook = {
      name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAME[Math.floor(Math.random() * WIZARD_SURNAME.length)],
      coatColor: COAT[Math.floor(Math.random() * COAT.length)],
      eyesColor: EYES[Math.floor(Math.random() * EYES.length)]
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
